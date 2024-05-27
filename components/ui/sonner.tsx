"use client"

// import { useTheme } from "next-themes"
import { Toaster } from "sonner"

type SonnerProps = React.ComponentProps<typeof Toaster>

const Sonner = ({ ...props }: SonnerProps) => {
  // const { theme = "system" } = useTheme()

  return (
    <Toaster
      richColors
      theme="light"
      position="bottom-center"
      pauseWhenPageIsHidden
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground"
        },
      }}
      {...props}
    />
  )
}

export { Sonner }
