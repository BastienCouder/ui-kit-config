import fs from "fs";
import path from "path";
import { getDocTypeFromSlug } from "@/utils/docs";
import type { Doc, DocCategory, DocFrontmatter, DocMetadata, DocType } from "@/types/docs";
import { getTableOfContents } from "../utils/toc";
import { getAllMdxFiles, parseMDXFile } from "./mdx";

const getBreadcrumbs = (slug: string[]): { label: string; href: string }[] => {
  const result = slug.map((slugPart, index) => {
    const partPath = path.join(process.cwd(), "content", ...slug.slice(0, index + 1));
    if (fs.existsSync(partPath) && fs.lstatSync(partPath).isDirectory()) {
      // get title from index.mdx
      const indexPath = path.join(partPath, "index.mdx");
      if (fs.existsSync(indexPath)) {
        const fileRawContent = fs.readFileSync(indexPath, "utf-8");
        const { frontmatter } = parseMDXFile<DocFrontmatter>(fileRawContent);
        return {
          label: frontmatter.title,
          href: `/${slug.slice(0, index + 1).join("/")}`,
        };
      }
    } else {
      // get title from last {slug}.mdx
      const filePath = path.join(
        process.cwd(),
        "content",
        ...slug.slice(0, index),
        `${slugPart}.mdx`
      );
      if (fs.existsSync(filePath)) {
        const fileRawContent = fs.readFileSync(filePath, "utf-8");
        const { frontmatter } = parseMDXFile<DocFrontmatter>(fileRawContent);
        return {
          label: frontmatter.title,
          href: `/${slug.slice(0, index + 1).join("/")}`,
        };
      }
    }
  });

  return result.filter((elem) => !!elem) as { label: string; href: string }[];
};

type FrameworkColor = "react" | "vue" | "angular";

const findParentColor = (slug: string[]): FrameworkColor | undefined => {
  let currentPath = path.join(process.cwd(), "content", ...slug);

  while (slug.length > 0) {
    const indexPath = path.join(currentPath, "index.mdx");
    if (fs.existsSync(indexPath)) {
      const fileRawContent = fs.readFileSync(indexPath, "utf-8");
      const { frontmatter } = parseMDXFile<DocFrontmatter>(fileRawContent);
      if (frontmatter.color) {
        return frontmatter.color;
      }
    }
    slug.pop();
    currentPath = path.join(process.cwd(), "content", ...slug);
  }

  return undefined;
};

export const getDocFromSlug = async (slug: string[], parentColor?: FrameworkColor): Promise<Doc | null> => {
  const breadcrumbs = getBreadcrumbs(slug);
  const type = slug[0] as DocType;
  const directoryPath = path.join(process.cwd(), "content", ...slug);

  if (fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory()) {
    const indexPath = path.join(directoryPath, "index.mdx");
    if (fs.existsSync(indexPath)) {
      const fileRawContent = fs.readFileSync(indexPath, "utf-8");
      const { content, frontmatter } = parseMDXFile<DocFrontmatter>(fileRawContent);

      // Trouver la couleur depuis les parents si elle n'est pas définie dans le frontmatter
      const color = frontmatter.color as FrameworkColor || parentColor || findParentColor(slug);

      const subfolders = fs
        .readdirSync(directoryPath)
        .filter((item) => fs.lstatSync(path.join(directoryPath, item)).isDirectory());
      const categories = subfolders
        .map((subfolder) => {
          const categoryIndexPath = path.join(directoryPath, subfolder, "index.mdx");
          if (fs.existsSync(categoryIndexPath)) {
            const fileRawContent = fs.readFileSync(categoryIndexPath, "utf-8");
            const { frontmatter } = parseMDXFile<DocFrontmatter>(fileRawContent);
            return {
              label: frontmatter.title,
              href: `/${[...slug, subfolder].join("/")}`,
            };
          }
        })
        .filter((item) => item) as DocCategory[];
      const toc = await getTableOfContents(content);

      return {
        metadata: {
          title: frontmatter.title,
          description: frontmatter.description,
          icon: frontmatter.icon,
          href: "",
          type,
          breadcrumbs,
          links: frontmatter.links,
          color,
        },
        rawContent: content,
        categories,
        toc,
      };
    }
  }

  const filePath = path.join(
    process.cwd(),
    "content",
    ...slug.slice(0, -1),
    `${slug[slug.length - 1]}.mdx`
  );
  if (fs.existsSync(filePath)) {
    const fileRawContent = fs.readFileSync(filePath, "utf-8");
    const { content, frontmatter } = parseMDXFile<DocFrontmatter>(fileRawContent);

    const color = frontmatter.color as FrameworkColor || parentColor || findParentColor(slug.slice(0, -1));

    const toc = await getTableOfContents(content);
    return {
      metadata: {
        title: frontmatter.title,
        description: frontmatter.description,
        icon: frontmatter.icon,
        href: "",
        type,
        breadcrumbs,
        links: frontmatter.links,
        color,
      },
      rawContent: content,
      toc,
    };
  }

  return null;
};
// getDocs() returns all docs from content folder
// getDocs("hooks") returns all docs from content/hooks folder
// getDocs("components/core") returns all docs from content/components/core folder
export const getDocs = (slug?: string, includeIndex = false): DocMetadata[] => {
  const directoryPath = path.join(process.cwd(), "content", ...(slug ? slug.split("/") : []));

  // console.log(
  //   getAllMdxFiles(directoryPath, directoryPath, [], includeIndex).map(
  //     ({ fullPath, relativePath }) => {
  //       const itemRawContent = fs.readFileSync(fullPath, "utf-8");
  //       const { frontmatter } = parseMDXFile<DocFrontmatter>(itemRawContent);
  //       return {
  //         ...frontmatter,
  //         type: getDocTypeFromSlug(slug),
  //         breadcrumbs: [],
  //         href: `${slug ? `/${slug}` : ""}/${relativePath.join("/").replace("/index", "")}`,
  //       };
  //     }
  //   )
  // );
  return getAllMdxFiles(directoryPath, directoryPath, [], includeIndex).map(
    ({ fullPath, relativePath }) => {
      const itemRawContent = fs.readFileSync(fullPath, "utf-8");
      const { frontmatter } = parseMDXFile<DocFrontmatter>(itemRawContent);
      return {
        ...frontmatter,
        type: getDocTypeFromSlug(slug),
        breadcrumbs: [],
        href: `${slug ? `/${slug}` : ""}/${relativePath.join("/").replace("/index", "")}`,
      };
    }
  );
};
