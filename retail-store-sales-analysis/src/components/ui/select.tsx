import type { SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100", className)} {...props} />
}
