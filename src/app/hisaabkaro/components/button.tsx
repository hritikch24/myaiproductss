import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
        success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600",
        warning: "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1da851] focus-visible:ring-[#25D366]",
        outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300",
        ghost: "hover:bg-gray-100 text-gray-700",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 min-h-[48px]",
        sm: "h-9 px-3 text-xs min-h-[36px]",
        lg: "h-14 px-6 text-base min-h-[56px]",
        xl: "h-16 px-8 text-lg min-h-[64px]",
        icon: "h-11 w-11 min-h-[48px] min-w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
