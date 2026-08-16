import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <div className="rounded-md border border-neutral-200 p-1.5"><Icon className="h-4 w-4 text-neutral-600" /></div>
        </div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <p className="mt-1 text-xs text-neutral-500">{detail}</p>
      </CardContent>
    </Card>
  )
}
