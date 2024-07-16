"use client"
import { ToggleButton } from "@/lib/components/core/default/react/buttons/toggle";
import { Bold, PiIcon, PinIcon } from "lucide-react";
import React from "react";

export default function HomePage() {
  const [isSelected, setSelected] = React.useState(true);

  return (
    <main className="container pb-36 pt-16">
<div className="flex items-center gap-4">
<ToggleButton isSelected={isSelected}  onPressedChange={setSelected} >
    <PinIcon className="rotate-45" />
  </ToggleButton>
 </div>
    </main>
  );
}
