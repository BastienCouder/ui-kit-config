"use client";

import * as React from "react";

import { Separator } from "@/lib/components/core/default/react/dataDisplay/separator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/lib/components/core/default/react/draggable/resizable";
import { Button } from "@/lib/components/core/default/react/buttons/button";
import { Popover } from "@/lib/components/core/default/react/overlay/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger } from "@/lib/components/core/default/react/overlay/tooltip";
import { Header } from "@/components/header";
import Divider from "@/lib/components/core/default/react/dataDisplay/divider";
import { toast } from "@/lib/components/core/default/react/overlay/use-toast";
import { ToastAction } from "@/lib/components/core/default/react/overlay/toast";

export default function HomePage() {
  const handleClick = (variant: string) => {
    toast({
      variant: variant as any,
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <div><ToastAction altText="Goto schedule to undo">Undo</ToastAction></div>,
    });
  };
 
  const TOAST_VARIANTS = [
    { name: "default" },
    { name: "success" },
    { name: "warning" },
    { name: "error" },
  ];
 
  return (
    <main className="container pb-36 pt-16">
      <div className="flex flex-col items-center gap-10">
     
    <Tooltip content={<Header/>}>
      <Button>hover</Button>
    </Tooltip>
    </div>
    <Popover
        content={<Header/>}
        shouldFlip={true}
        className="w-full"
        flexContent="end"
      >
        <Button>Cliquer moi</Button>
      </Popover>
      <div className="flex space-x-6 border p-4">
      {TOAST_VARIANTS.map(({ name }) => (
        <Button
          key={name}
          variant="outline"
          onClick={() => handleClick(name)}
          className="capitalize"
        >
          {name}
        </Button>
      ))}
    </div>
      {/* <div className="flex items-center gap-4">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" shape="circle" size="lg" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>*/}
        <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  <div className="flex items-center gap-10">
      <div className="flex h-5 items-center gap-2 text-sm">
        <div>Components</div>
        <Separator orientation="vertical" />
        <div>Hooks</div>
      </div>
      <div className="flex flex-col items-center gap-2 text-sm">
        <div>Components</div>
        <Separator orientation="horizontal" />
        <div>Hooks</div>
      </div>
    </div>
    <Divider position="after">After</Divider>
      <Divider position="before">Before</Divider>
      <Divider className="gap-4">Gap 4</Divider>
    </main> 
  );
}
