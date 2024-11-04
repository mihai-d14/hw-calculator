import * as React from "react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${
        variant === "destructive" 
          ? "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
          : "text-foreground"
      } ${className}`}
      {...props}
    />
  )
}

export function AlertDescription({
    className,
    ...props
  }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
      <div
        className={`text-sm [&_p]:leading-relaxed ${className}`}
        {...props}
      />
    )
  }