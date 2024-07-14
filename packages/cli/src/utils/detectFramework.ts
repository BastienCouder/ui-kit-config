import { existsSync, promises as fs } from "fs";
import path from "path";

export async function detectFramework(cwd:string) {
  const packageJsonPath = path.join(cwd, "package.json");
  if (!existsSync(packageJsonPath)) {
    throw new Error(`The path ${cwd} does not contain a package.json file.`);
  }

  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  if (dependencies.react) return "react";
  if (dependencies.vue) return "vue";
  if (dependencies.angular) return "angular";
  if (dependencies.svelte) return "svelte";

  throw new Error("Could not detect the framework. Please ensure your project has dependencies installed.");
}
