import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";

interface Preview {
  relativePath: string;
}

export const parseMDXFiles = (
  directory: string,
  rootDirectory: string,
  filesArray: Preview[] = []
): Preview[] => {
  const files = fs.readdirSync(directory);


  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      parseMDXFiles(filePath, rootDirectory, filesArray);
    } else if (path.extname(file) === ".mdx") {

      // search with regex the compoonent ComponentPreview and get name from its prop
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const componentNames = (
        fileContent.match(/<ComponentPreview(?:[^>]*\s)?name="([^"]+)"/g) ?? []
      )
        .map((match) => {
          return match.match(/name="([^"]+)"/)?.[1];
        })
        .filter(Boolean) as string[];

      componentNames.forEach((componentName) => {
        filesArray.push({ relativePath: componentName });
      });
    }
  });

  return filesArray;
};

const getAllPreviews = () => {
  const directoryPath = path.join(process.cwd(), "content");
  return parseMDXFiles(directoryPath, directoryPath);
};

const allPreviews = getAllPreviews();

let error = null;
let index = `
// This file is autogenerated by scripts/build-preview-imports.ts
// Do not edit this file directly.
import React from "react";

export const previews = {
`;

const supportedExtensions = [".tsx", ".vue"];
const adjustRelativePath = (relativePath:string) => {
  const replace = relativePath.replace('/vue/', '/react/');
  console.log(replace);
  return replace;
};

allPreviews.forEach(({ relativePath }) => {
  const adjustedRelativePath = adjustRelativePath(relativePath); // Ajuster le chemin relativePath
  const fullPath = path.join(process.cwd(), "src", "lib", relativePath);
  let code = [];

  // si c'est un répertoire, obtenir tous les fichiers
  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
    const files = fs.readdirSync(fullPath);
    code = files
      .filter((file) => supportedExtensions.includes(path.extname(file)))
      .map((file) => {
        const filePath = path.join(fullPath, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return {
          title: file === "index.tsx" ? `${path.basename(fullPath)}.tsx` : file,
          code: fileContent,
        };
      })
      .sort((a) => (a.title === `${path.basename(fullPath)}.tsx` ? -1 : 1));
  } else {
    // si c'est un fichier, obtenir le contenu et le nom du fichier
    const foundExtension = supportedExtensions.find((ext) => fs.existsSync(`${fullPath}${ext}`));
    if (!foundExtension) {
      console.log(`❌ ${fullPath} with supported extensions does not exist`);
      error = true;
      return;
    }
    const fileContent = fs.readFileSync(`${fullPath}${foundExtension}`, "utf-8");
    const fileName = path.basename(fullPath);
    code = [{ title: `${fileName}${foundExtension}`, code: fileContent }];
  }

  // Toujours s'assurer que le composant est chargé avec React.lazy
  index += `  "${relativePath}": {\n`;
  index += `    component: React.lazy(() => import("@/lib/${adjustedRelativePath}")),\n`;
  index += `    code: ${JSON.stringify(code)}\n`;
  index += `  },\n`;
});

index += `};\n`;

if (!error) {
  rimraf.sync(path.join(process.cwd(), "src", "autogenerated", "previews.ts"));
  fs.writeFileSync(path.join(process.cwd(), "src", "autogenerated", "previews.ts"), index);

  console.log("\x1b[32m✓\x1b[0m Generated previews.ts file.");
}