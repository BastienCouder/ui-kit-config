import fs from "fs";
import path from "path";

export const getComponentSource = (relativePath: string, extensions?: string | string[]) => {

  if (!relativePath) {
    console.error("relativePath is undefined");
    return [];
  }

  const fullPath = path.join(process.cwd(), "src", "lib", relativePath);
  let code: { title: string; code: string; extension: string }[] = [];

  // Convert single extension to array for uniform processing
  const exts = Array.isArray(extensions) ? extensions : [extensions || "tsx", "ts"];

  // Check if fullPath exists and is a directory
  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
    const files = fs.readdirSync(fullPath);
    code = files
      .filter((file) => exts.includes(path.extname(file).slice(1)))
      .map((file) => {
        const filePath = path.join(fullPath, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return {
          title: file === "index.tsx" ? `${path.basename(fullPath)}.tsx` : file,
          code: fileContent,
          extension: path.extname(file).slice(1),
        };
      })
      .sort((a) => (a.title === `${path.basename(fullPath)}.tsx` ? -1 : 1));
  } else {
    // Check for the file with given or default extensions
    let fileFound = false;
    let fileContent = "";
    let fileExt = "";
    for (const ext of exts) {
      if (fs.existsSync(`${fullPath}.${ext}`)) {
        fileContent = fs.readFileSync(`${fullPath}.${ext}`, "utf-8");
        fileExt = ext;
        fileFound = true;
        break;
      }
    }

    if (!fileFound) {
      console.log(`${fullPath}.ts(x) does not exist`);
      return [];
    }

    const fileName = path.basename(fullPath);
    code = [{ title: `${fileName}.${fileExt}`, code: fileContent, extension: fileExt }];
  }
  return code;
};
