"use client";

import {
  Link as AriaLink,
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
  type BreadcrumbsProps as AriaBreadcrumbsProps,
  type BreadcrumbProps as AriaBreadcrumbProps,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const breadcrumbsStyles = tv({
  slots: {
    root: "flex flex-wrap items-center gap-1.5 break-words text-sm [&_svg]:size-4",
    item: "inline-flex items-center gap-1.5 [&_svg]:last:hidden",
    link: "inline-flex items-center gap-1.5 hover:text-primary transition-colors current:text-primary disabled:[&:not([data-current])]:text-disabled-fg disabled:cursor-default",
  },
});

type BreadcrumbsProps<T extends object> = AriaBreadcrumbsProps<T>;

const Breadcrumbs = <T extends object>({ className, ...props }: BreadcrumbsProps<T>) => {
  const { root } = breadcrumbsStyles();
  return <AriaBreadcrumbs {...props} className={root({ className })} />;
};

type BreadcrumbProps = Omit<AriaBreadcrumbProps, "children"> &
  Omit<AriaLinkProps, "className" | "style"> & { icon?: React.ReactNode };
const Breadcrumb = ({ children, className, style, icon = null, ...props }: BreadcrumbProps) => {
  return (
    <BreadcrumbItem className={className} style={style} {...props}>
      {icon}
      <BreadcrumbLink {...props}>{children}</BreadcrumbLink>
      <ChevronRightIcon className="text-primary" />
    </BreadcrumbItem>
  );
};

type BreadcrumbItemProps = AriaBreadcrumbProps;
const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => {
  const { item } = breadcrumbsStyles();
  return <AriaBreadcrumb {...props} className={cn(item({ className }))} />;
};

interface BreadcrumbLinkProps extends Omit<AriaLinkProps, "className"> {
  className?: string;
}
const BreadcrumbLink = ({ className, ...props }: BreadcrumbLinkProps) => {
  const { link } = breadcrumbsStyles();
  return <AriaLink {...props} className={link({ className })} />;
};

export type { BreadcrumbsProps, BreadcrumbProps, BreadcrumbItemProps, BreadcrumbLinkProps };
export { Breadcrumbs, Breadcrumb, BreadcrumbItem, BreadcrumbLink };
