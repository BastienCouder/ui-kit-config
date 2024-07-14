import prompts from "prompts";
import { rawConfigSchema } from "@/src/utils/get-config";
import ora from "ora";
import chalk from "chalk";
import { promises as fs } from "fs";
import path from "path";
import { getRegistryStyles, getRegistryBaseColors } from "@/src/utils/registry";
import { resolveConfigPaths } from "@/src/utils/get-config";

export async function promptForReactConfig(cwd:string, defaultConfig = null, skip = false) {
  const highlight = (text:string) => chalk.cyan(text);

  const styles = await getRegistryStyles();
  const baseColors = await getRegistryBaseColors();

  const options = await prompts([
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${highlight("TypeScript")} (recommended)?`,
      initial: (defaultConfig as any)?.tsx ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "select",
      name: "style",
      message: `Which ${highlight("style")} would you like to use?`,
      choices: styles.map((style) => ({
        title: style.label,
        value: style.name,
      })),
    },
    {
      type: "select",
      name: "tailwindBaseColor",
      message: `Which color would you like to use as ${highlight("base color")}?`,
      choices: baseColors.map((color) => ({
        title: color.label,
        value: color.name,
      })),
    },
    {
      type: "text",
      name: "tailwindCss",
      message: `Where is your ${highlight("global CSS")} file?`,
      initial: (defaultConfig as any)?.tailwind.css ?? "src/styles/tailwind.css",
    },
    {
      type: "toggle",
      name: "tailwindCssVariables",
      message: `Would you like to use ${highlight("CSS variables")} for colors?`,
      initial: (defaultConfig as any)?.tailwind.cssVariables ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "tailwindPrefix",
      message: `Are you using a custom ${highlight("tailwind prefix eg. tw-")}? (Leave blank if not)`,
      initial: "",
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: `Where is your ${highlight("tailwind.config.js")} located?`,
      initial:  (defaultConfig as any)?.tailwind.config ?? "tailwind.config.js",
    },
    {
      type: "text",
      name: "components",
      message: `Configure the import alias for ${highlight("components")}:`,
      initial: (defaultConfig as any)?.aliases?.["components"] ?? "@/components",
    },
    {
      type: "text",
      name: "utils",
      message: `Configure the import alias for ${highlight("utils")}:`,
      initial:  (defaultConfig as any)?.aliases["utils"] ?? "@/utils",
    },
    {
      type: "toggle",
      name: "rsc",
      message: `Are you using ${highlight("React Server Components")}?`,
      initial: (defaultConfig as any)?.rsc ?? true,
      active: "yes",
      inactive: "no",
    },
  ]);

  const config = rawConfigSchema.parse({
    $schema: "https://ui.shadcn.com/schema.json",
    style: options.style,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      baseColor: options.tailwindBaseColor,
      cssVariables: options.tailwindCssVariables,
      prefix: options.tailwindPrefix,
    },
    rsc: options.rsc,
    tsx: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  });

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlight("components.json")}. Proceed?`,
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  // Write to file.
  console.log("");
  const spinner = ora(`Writing components.json...`).start();
  const targetPath = path.resolve(cwd, "components.json");
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8");
  spinner.succeed();

  return await resolveConfigPaths(cwd, config);
}
