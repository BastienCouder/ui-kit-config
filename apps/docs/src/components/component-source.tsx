import React from "react";
import { CodeBlock } from "@/components/code-block";
import { getComponentSource } from "@/server/component-source";
import { BundledLanguage } from "shiki";

export const ComponentSource = ({
  name,
  extension,
  className,
}: {
  name: string | string[];
  extension?: string | string[];
  className?: string;
}) => {
  let code: { title: string; code: string; extension: string }[] = [];

  if (!name) {
    console.error("name is undefined");
    return <p>Source code not found</p>;
  }

  if (Array.isArray(name)) {
    code = name.flatMap((n, index) => {
      const ext = Array.isArray(extension) ? extension[index] : extension;
      return getComponentSource(n, ext);
    });
  }

  if (code.length === 0) {
    return <p>Source code not found</p>;
  }
  
  return (
    <CodeBlock
      files={code.map((file) => ({ fileName: file.title, code: file.code, lang: file.extension as BundledLanguage || "tsx" }))}
      className={className}
      expandable
    />
  );
};
