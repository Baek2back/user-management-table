import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "flex items-center gap-x-2 rounded-[8px] border border-colorPrimary bg-colorPrimary text-base-normal text-colorTextLightSolid outline-none hover:border-colorPrimaryHover hover:bg-colorPrimaryHover active:border-colorPrimaryActive active:bg-colorPrimaryActive disabled:border-colorBorder disabled:bg-colorBgContainerDisabled disabled:text-colorTextDisabled",
      outline:
        "rounded-[8px] border border-colorBorder bg-colorTextLightSolid text-base-normal",
      icon: "flex items-center justify-center rounded-[8px] bg-transparent hover:bg-colorBgTextHover focus-visible:outline-none active:bg-colorBgTextHover disabled:bg-colorBgTextHover",
      filter:
        "flex w-full items-center justify-between gap-[8px] border-r-[0.5px] px-[8px]",
    },
    size: {
      default: "h-[32px] px-[12px]",
      icon: "h-[32px] w-[32px]",
      filter: "h-[22px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
