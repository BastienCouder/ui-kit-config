import { Button } from "@/lib/components/core/default/react/button";

const variants = [
  "default",
  "secondary",
  "outline",
  "quiet",
  "success",
  "warning",
  "danger",
  "accent",
] as const;

export default function Demo() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}
