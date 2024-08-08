import { cn } from "@/lib/utils";
import { VueLogo } from "@/assets/images/brands/vuejs";
import { AngularLogo } from "@/assets/images/brands/angular";

export interface DocsLogoProps {
  name: string[];
  className?: string;
}

export const DocsLogo = ({ name, className}: DocsLogoProps) => {
    console.log(name);
    
  const logo = name[1];

  return (
    <div>
    {logo === "vue"  && (
        <VueLogo className={cn("w-10 h-10", className)} />
     )}
        {logo === "angular"  && (
        <AngularLogo className={cn("w-10 h-10", className)} />
     )}
    </div>
  );
};
