import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { cn } from '@/lib/utils';

interface SlottableTextPropsWithClassName extends SlottableTextProps {
  className?: string;
}

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextPropsWithClassName>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        style={cn('text-base text-foreground web:select-text', textClass, className) as StyleProp<TextStyle>}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };