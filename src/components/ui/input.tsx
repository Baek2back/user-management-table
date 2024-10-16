import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[32px] w-full rounded-[8px] border border-colorBorder bg-colorTextLightSolid px-[12px] py-[5px] text-base-normal placeholder:text-colorTextPlaceholder hover:border-colorPrimary focus:border-colorPrimary focus:shadow-focusPrimary focus-visible:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
