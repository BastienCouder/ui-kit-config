import type { DocsNav } from "./docs-nav";
import type { TableOfContents } from "./toc";

export type DocType = "hook" | "component" | "page" | "template" | "block" | undefined;

export type DocAspect = "video" | "page";

interface DocLink {
  label: string;
  href: string;
}

interface Thumbnail {
  image: string;
  video?: string;
}

export interface DocCategory {
  label: string;
  href: string;
}
export interface DocsConfig {
  nav: DocsNav;
}

export interface DocFrontmatter {
  title: string;
  description?: string;
  thumbnail?: Thumbnail;
  keywords?: string[];
  links?: DocLink[];
  label?: string;
  icon?: JSX.Element;
  color?:"react" | "vue" | "angular";
}

export interface DocMetadata {
  title: string;
  type: DocType;
  icon?: JSX.Element;
  href: string;
  breadcrumbs: { label: string; href: string }[];
  description?: string;
  thumbnail?: Thumbnail;
  keywords?: string[];
  links?: DocLink[];
  label?: string;
  disabled?: boolean;
  color?: "react" | "vue" | "angular";
}

export interface Doc {
  metadata: DocMetadata;
  categories?: DocCategory[];
  toc: TableOfContents;
  rawContent: string;
}
