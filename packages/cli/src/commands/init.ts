import { existsSync, promises as fs } from "fs";
import path from "path";
import { execa } from "execa";

import { preFlight } from "@/src/utils/get-project-info";
import { handleError } from "@/src/utils/handle-error";
import { logger } from "@/src/utils/logger";
import { Command } from "commander";
import ora from "ora";
import { z } from "zod";
import * as templates from "@/src/utils/templates";
import { getRegistryBaseColor } from "@/src/utils/registry";
import { applyPrefixesCss } from "../utils/transformers/transform-tw-prefix";
import { getPackageManager } from "@/src/utils/get-package-manager";
import { detectFramework } from "../utils/detectFramework";
import { promptForReactConfig } from "../utils/promptsReact";
import chalk from "chalk";
import { Config } from "../utils/get-config";
import template from "lodash.template";

const PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean(),
});

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-d, --defaults,", "use default configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      preFlight(cwd);

      const framework = await detectFramework(cwd);

      logger.info(`Framework detected: ${framework}`);
      await configureTailwindCSS(cwd, framework);
      
      let config;
      if (framework === "react") {
        config = await promptForReactConfig(cwd, null, options.yes);
      // } else if (framework === "vue") {
      //   config = await promptForVueConfig(cwd, null, options.yes);
      // } else if (framework === "angular") {
      //   config = await promptForAngularConfig(cwd, null, options.yes);
      // } else if (framework === "svelte") {
      //   config = await promptForSvelteConfig(cwd, null, options.yes);
      // }
      }
      if (config) {
        await runInit(cwd, config, framework);
      } else {
        logger.error(`Configuration is missing. Please run init to create a components.json file.`);
        process.exit(1);
      }

      logger.info("");
      logger.info(
        `${chalk.green(
          "Success!"
        )} Project initialization completed. You may now add components.`
      );
      logger.info("");
    } catch (error) {
      handleError(error);
    }
  });

async function runInit(cwd: string, config: Config, framework: string) {
  const spinner = ora(`Initializing project...`)?.start();

  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath;

    if (key === "utils" && resolvedPath.endsWith("/utils")) {
      dirname = dirname.replace(/\/utils$/, "");
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  const extension = config.tsx ? "ts" : "js";
  const tailwindConfigExtension = path.extname(config.resolvedPaths.tailwindConfig);

  let tailwindConfigTemplate;
  if (tailwindConfigExtension === ".ts") {
    tailwindConfigTemplate = config.tailwind.cssVariables
      ? templates.TAILWIND_CONFIG_TS_WITH_VARIABLES
      : templates.TAILWIND_CONFIG_TS;
  } else {
    tailwindConfigTemplate = config.tailwind.cssVariables
      ? templates.TAILWIND_CONFIG_WITH_VARIABLES
      : templates.TAILWIND_CONFIG;
  }

  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    template(tailwindConfigTemplate)({
      extension,
      prefix: config.tailwind.prefix,
    }),
    "utf8"
  );

  const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);
  if (baseColor) {
    await fs.writeFile(
      config.resolvedPaths.tailwindCss,
      config.tailwind.cssVariables
        ? config.tailwind.prefix
          ? applyPrefixesCss(baseColor.cssVarsTemplate, config.tailwind.prefix)
          : baseColor.cssVarsTemplate
        : baseColor.inlineColorsTemplate,
      "utf8"
    );
  }

  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    extension === "ts" ? templates.UTILS : templates.UTILS_JS,
    "utf8"
  );

  spinner?.succeed();

  const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
  const packageManager = await getPackageManager(cwd);

  const deps = [
    ...PROJECT_DEPENDENCIES,
    config.style === "new-york" ? "@radix-ui/react-icons" : "lucide-react",
  ];

  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...deps],
    {
      cwd,
    }
  );
  dependenciesSpinner?.succeed();

  // Ensure Tailwind CSS is installed and configured
 
}

async function configureTailwindCSS(cwd: string, framework: string) {
  const spinner = ora(`Configuring Tailwind CSS for ${framework}...`).start();

  try {
    await execa("npx", ["tailwindcss", "init", "-p"], { cwd });

    let tailwindConfig = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

    if (framework === "vue") {
      tailwindConfig = tailwindConfig.replace(
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
        "./src/**/*.{js,ts,jsx,tsx,vue}"
      );
    } else if (framework === "react") {
      tailwindConfig = tailwindConfig.replace(
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
        "./src/**/*.{js,ts,jsx,tsx}"
      );
    } else if (framework === "svelte") {
      tailwindConfig = tailwindConfig.replace(
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
        "./src/**/*.{js,ts,jsx,tsx,svelte}"
      );
    } else if (framework === "angular") {
      tailwindConfig = tailwindConfig.replace(
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
        "./src/**/*.{js,ts,jsx,tsx,html}"
      );
    }

    await fs.writeFile(
      path.join(cwd, "tailwind.config.js"),
      tailwindConfig,
      "utf8"
    );

    let globalCssPath;
    if (framework === "vue") {
      globalCssPath = path.join(cwd, "src", "assets", "main.css");
    } else if (framework === "react") {
      globalCssPath = path.join(cwd, "src", "index.css");
    } else if (framework === "svelte") {
      globalCssPath = path.join(cwd, "src", "global.css");
    } else if (framework === "angular") {
      globalCssPath = path.join(cwd, "src", "styles.css");
    }

    if (globalCssPath) {
      await fs.writeFile(
        globalCssPath,
        `
@tailwind base;
@tailwind components;
@tailwind utilities;
        `,
        "utf8"
      );
    }

    spinner.succeed();
  } catch (error:any) {
    spinner.fail(`Failed to configure Tailwind CSS: ${error.message}`);
    throw error;
  }
}
