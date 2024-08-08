import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";
import { TableOfContents } from "@/components/docs/toc";
import { Mdx } from "@/components/mdx/mdx-remote";
import { Breadcrumbs, Breadcrumb } from "@/lib/components/core/default/breadcrumbs";
import { Button } from "@/lib/components/core/default/react/buttons/button";
import { ScrollArea } from "@/lib/components/core/default/scroll-area";
import { cn } from "@/lib/utils";
import { getDocFromSlug, getDocs } from "@/server/docs";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { DocsLogo } from "@/components/docs/doc-logo";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = await getDocFromSlug(params.slug);

  if (!doc) {
    return {};
  }

  return {
    title: doc.metadata.title,
    description: doc.metadata.description,
    // TODO add openGraph and twitter
  };
}
export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const allDocs = getDocs(undefined, true);
  return allDocs.map((doc) => ({ slug: doc.href.split("/").slice(1) }));
}

export default async function Page({ params }: PageProps) {
  const doc = await getDocFromSlug(params.slug);

  if (!doc) {
    notFound();
  }

  const { rawContent, metadata, categories } = doc;
console.log(metadata);

  const themeColor = metadata.color || "react";

  return (
    <ThemeWrapper metadataColor={themeColor} >
      <main
        className={cn("relative pb-20 lg:gap-10", {
          "xl:grid xl:grid-cols-[1fr_220px]": !!doc.toc.items,
        })}
      >
        <div className="mx-auto w-full min-w-0 pt-6">
          {metadata.breadcrumbs.length > 1 && (
            <Breadcrumbs className="mb-2">
              {metadata.breadcrumbs.map((item, index) => (
                <Breadcrumb
                  key={item.href}
                  href={index < metadata.breadcrumbs.length - 1 ? item.href : undefined}
                >
                  {item.label}
                </Breadcrumb>
              ))}
            </Breadcrumbs>
          )}
          <div className="flex gap-4">
          <h1 className={`text-4xl font-bold text-primary`}>{metadata.title}</h1>
          <DocsLogo name={params.slug}/>
          </div>
          <p className={`mt-2 opacity-90`}>{metadata.description}</p>
          {metadata.links && metadata.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {metadata.links.map((link, index) => (
                <Button
                  key={index}
                  href={link.href}
                  suffix={<ExternalLinkIcon />}
                  size="sm"
                  className="h-6 text-xs font-semibold [&_svg]:size-3"
                  target="_blank"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          )}
          <div className="mt-10 text-sm md:text-base">
            <Mdx source={rawContent} />
          </div>
        </div>
        {doc.toc.items && ( // doc.toc
          <div className="hidden text-sm xl:block">
            <div className="sticky top-0">
              <ScrollArea className="h-screen pb-8">
                <div className="pb-16 pt-6">
                  <TableOfContents toc={doc.toc} />
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </main>
    </ThemeWrapper>
  );
}
