"use client";

import React, { useEffect } from "react";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useTheme } from "next-themes";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  metadataColor: "react" | "angular" | "vue";
}

export function ThemeWrapper(props: ThemeWrapperProps) {
  const { children, metadataColor } = props;
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    if (metadataColor) {
      setTheme(metadataColor);
    }
  }, [metadataColor, setTheme]);

  // Only apply the theme class if the component is mounted
  const themeClass = mounted ? `${theme || 'default-theme'}` : 'default-theme';

  return (
    <div className={`w-full h-full ${themeClass}`}>
      {mounted ? children : null}
    </div>
  );
}
