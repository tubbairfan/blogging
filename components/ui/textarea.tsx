import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `border-input placeholder:text-muted-foreground 
         min-h-16 w-full rounded-sm border px-3 py-2 text-base 
         md:text-sm`,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
