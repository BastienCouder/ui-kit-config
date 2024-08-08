"use client";

import React from 'react';

const BEFORE_HORIZONTAL = "before:h-px before:flex-1 before:bg-border before:content-['']";
const AFTER_HORIZONTAL = "after:h-px after:flex-1 after:bg-border after:content-['']";

const BEFORE_VERTICAL = "before:w-px before:flex-1 before:bg-border before:content-['']";
const AFTER_VERTICAL = "after:w-px after:flex-1 after:bg-border after:content-['']";

const variantClasses: { [key: string]: { [key: string]: string } } = {
    horizontal: {
        default: `${BEFORE_HORIZONTAL} ${AFTER_HORIZONTAL}`,
        before: `${BEFORE_HORIZONTAL} gap-4`,
        after: `${AFTER_HORIZONTAL} gap-4`,
      },
      vertical: {
        default: `${BEFORE_VERTICAL} ${AFTER_VERTICAL}`,
        before: `${BEFORE_VERTICAL} gap-4`,
        after: `${AFTER_VERTICAL} gap-4`,
      },
};

const Divider = ({ position = 'default',  orientation = 'horizontal', children , className }: { position?: string, orientation?: string, children?: React.ReactNode, className?:string }) => {
    const isHorizontal = orientation === 'horizontal';
    const baseClasses = isHorizontal ? 'flex justify-center items-center my-4' : 'flex flex-col justify-center items-center mx-4';
    const classes = `${baseClasses} ${variantClasses[orientation][position]}`;
    
  
  return (
      <div className={[classes, className].join(' ')}>{children}</div>
  );
};

export default Divider;
