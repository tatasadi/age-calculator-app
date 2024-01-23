import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-[6rem] rounded-lg border border-neutral-light-grey p-4 text-xl font-bold leading-normal tracking-[0.0125rem] ring-offset-white hover:border-primary-purple focus-visible:border-primary-purple focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:w-[10rem] lg:text-[2rem] lg:tracking-[0.02rem]",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
