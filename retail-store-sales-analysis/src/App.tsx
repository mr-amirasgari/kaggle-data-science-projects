import { useMemo, useState } from "react"
import {
  Activity,
  BarChart3,
  Building2,
  Calculator,
  Code2,
  Database,
  ExternalLink,
  Gauge,
  Menu,
  Search,
  ShoppingCart,
  Store,
  X,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import storesRaw from "@/data/stores.json"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { StatCard } from "@/components/dashboard/StatCard"
import { modelMetrics, predictRevenue } from "@/lib/model"
import { cn } from "@/lib/utils"

type StoreRow = {
  storeNumber: number
  area: number
  property: string
  type: string
  age: string
  checkout: number | null
  revenue: number
  revenuePerArea: number
}

type View = "overview" | "explorer" | "performance" | "model" | "about"

const stores = storesRaw as StoreRow[]
const money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })
const compactMoney = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })
const decimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })

const repoUrl = "https://github.com/mr-amirasgari/kaggle-data-science-projects/tree/main/retail-store-sales-analysis"
const liveUrl = "https://mr-amirasgari.github.io/kaggle-data-science-projects/retail-store-sales-analysis/"

function sum(values: number[]) { return values.reduce((a, b) => a + b, 0) }
function average(values: number[]) { return values.length ? sum(values) / values.length : 0 }
function median(values: number[]) {
  const s = [...values].sort((a, b) => a - b)
  if (!s.length) return 0
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

function aggregateBy(key: "type" | "property" | "age") {
  const groups = new Map<string, StoreRow[]>()
  stores.forEach((row) => {
    const name = row[key]
    groups.set(name, [...(groups.get(name) ?? []), row])
  })
  return [...groups.entries()].map(([name, rows]) => ({
    name,
    stores: rows.length,
    totalRevenue: sum(rows.map((r) => r.revenue)),
    averageRevenue: average(rows.map((r) => r.revenue)),
    medianEfficiency: median(rows.map((r) => r.revenuePerArea)),
  })).sort((a, b) => b.totalRevenue - a.totalRevenue)
}

function Sidebar({ view, onView, mobileOpen, setMobileOpen }: { view: View; onView: (view: View) => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const items: { id: View; label: string; icon: typeof Store }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "explorer", label: "Store Explorer", icon: Search },
    { id: "performance", label: "Performance", icon: Gauge },
    { id: "model", label: "Revenue Model", icon: Calculator },
    { id: "about", label: "About", icon: Database },
  ]
  const content = (
    <aside className="flex h-full w-72 flex-col border-r border-neutral-200 bg-white">
      <div className="flex items-center gap-3 border-b border-neutral-200 p-5">
        <div className="rounded-lg bg-neutral-950 p-2 text-white"><Store className="h-5 w-5" /></div>
        <div><div className="text-sm font-semibold">Retail Analytics</div><div className="text-xs text-neutral-500">118-store portfolio project</div></div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const Icon = item.icon
          return <button key={item.id} onClick={() => { onView(item.id); setMobileOpen(false) }} className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition", view === item.id ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950")}><Icon className="h-4 w-4" />{item.label}</button>
        })}
      </nav>
      <div className="border-t border-neutral-200 p-4 text-xs leading-5 text-neutral-500">
        <p>Static GitHub Pages dashboard.</p>
        <p className="mt-1">No backend required.</p>
      </div>
    </aside>
  )
  return <>
    <div className="hidden h-screen md:block">{content}</div>
    {mobileOpen && <div className="fixed inset-0 z-50 md:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} /><div className="relative h-full w-72">{content}</div></div>}
  </>
}

function Overview() {
  const totalRevenue = sum(stores.map((r) => r.revenue))
  const medianRevenue = median(stores.map((r) => r.revenue))
  const medianEfficiency = median(stores.map((r) => r.revenuePerArea))
  const types = aggregateBy("type")
  const ages = aggregateBy("age")
  const top = [...stores].sort((a, b) => b.revenue - a.revenue).slice(0, 6).map((r) => ({ name: `#${r.storeNumber}`, revenue: r.revenue }))
  return <div className="space-y-6">
    <section><Badge>Portfolio dashboard</Badge><h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Retail store sales overview</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">Explore revenue scale, store formats, efficiency, and the regression experiment behind the project.</p></section>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Stores" value="118" detail="Rows in Stores.csv" icon={Store} />
      <StatCard label="Total revenue" value={compactMoney.format(totalRevenue)} detail={money.format(totalRevenue)} icon={Activity} />
      <StatCard label="Median revenue" value={compactMoney.format(medianRevenue)} detail="Per store" icon={BarChart3} />
      <StatCard label="Median efficiency" value={compactMoney.format(medianEfficiency)} detail="Revenue per area" icon={Gauge} />
    </div>
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2"><CardHeader><CardTitle>Average revenue by store type</CardTitle><CardDescription>Hyper leads average revenue in the supplied sample</CardDescription></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={types}><CartesianGrid vertical={false} stroke="#eee" /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis tickFormatter={(v) => compactMoney.format(Number(v))} axisLine={false} tickLine={false} /><Tooltip formatter={(v) => money.format(Number(v))} /><Bar dataKey="averageRevenue" fill="#171717" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      <Card><CardHeader><CardTitle>New vs old stores</CardTitle><CardDescription>Store-count composition</CardDescription></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ages} dataKey="stores" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>{ages.map((_, i) => <Cell key={i} fill={["#171717", "#a3a3a3"][i % 2]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card>
    </div>
    <Card><CardHeader><CardTitle>Top stores by revenue</CardTitle><CardDescription>Highest absolute revenue records</CardDescription></CardHeader><CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={top}><CartesianGrid vertical={false} stroke="#eee" /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis tickFormatter={(v) => compactMoney.format(Number(v))} axisLine={false} tickLine={false} /><Tooltip formatter={(v) => money.format(Number(v))} /><Bar dataKey="revenue" fill="#404040" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card>
  </div>
}

function Explorer() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("All")
  const [property, setProperty] = useState("All")
  const [age, setAge] = useState("All")
  const types = ["All", ...Array.from(new Set(stores.map((r) => r.type)))]
  const properties = ["All", ...Array.from(new Set(stores.map((r) => r.property)))]
  const ages = ["All", ...Array.from(new Set(stores.map((r) => r.age)))]
  const filtered = useMemo(() => stores.filter((r) => {
    const matchQuery = !query || String(r.storeNumber).includes(query.trim())
    return matchQuery && (type === "All" || r.type === type) && (property === "All" || r.property === property) && (age === "All" || r.age === age)
  }), [query, type, property, age])
  return <div className="space-y-6">
    <section><Badge>{filtered.length} matching stores</Badge><h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Store explorer</h1><p className="mt-2 text-sm text-neutral-500">Search by store number and filter the cleaned categorical labels.</p></section>
    <Card><CardContent className="grid gap-3 pt-5 sm:grid-cols-2 xl:grid-cols-4"><div><Label>Store number</Label><Input placeholder="e.g. 44" value={query} onChange={(e) => setQuery(e.target.value)} /></div><div><Label>Type</Label><Select value={type} onChange={(e) => setType(e.target.value)}>{types.map((v) => <option key={v}>{v}</option>)}</Select></div><div><Label>Property</Label><Select value={property} onChange={(e) => setProperty(e.target.value)}>{properties.map((v) => <option key={v}>{v}</option>)}</Select></div><div><Label>Old / New</Label><Select value={age} onChange={(e) => setAge(e.target.value)}>{ages.map((v) => <option key={v}>{v}</option>)}</Select></div></CardContent></Card>
    <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500"><tr><th className="px-4 py-3">Store</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Property</th><th className="px-4 py-3">Age</th><th className="px-4 py-3">Area</th><th className="px-4 py-3">Checkout</th><th className="px-4 py-3">Revenue</th><th className="px-4 py-3">Rev / Area</th></tr></thead><tbody>{filtered.map((r) => <tr key={r.storeNumber} className="border-t border-neutral-200"><td className="px-4 py-3 font-medium">#{r.storeNumber}</td><td className="px-4 py-3">{r.type}</td><td className="px-4 py-3">{r.property}</td><td className="px-4 py-3">{r.age}</td><td className="px-4 py-3">{money.format(r.area)}</td><td className="px-4 py-3">{r.checkout ?? "Missing"}</td><td className="px-4 py-3">{money.format(r.revenue)}</td><td className="px-4 py-3">{money.format(r.revenuePerArea)}</td></tr>)}</tbody></table></div></Card>
  </div>
}

function Performance() {
  const typeGroups = ["Express", "Extra", "Hyper"].map((type) => ({ type, rows: stores.filter((r) => r.type === type).map((r) => ({ area: r.area, revenue: r.revenue / 1_000_000, store: r.storeNumber })) }))
  const topEfficiency = [...stores].sort((a, b) => b.revenuePerArea - a.revenuePerArea).slice(0, 10)
  const property = aggregateBy("property")
  return <div className="space-y-6">
    <section><Badge>Business analysis</Badge><h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Store performance</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">Revenue scale and revenue efficiency answer different questions. RevToArea is used for business analysis only and is excluded from predictive modeling.</p></section>
    <Card><CardHeader><CardTitle>Revenue vs store area</CardTitle><CardDescription>Revenue in millions, separated by store type</CardDescription></CardHeader><CardContent className="h-96"><ResponsiveContainer width="100%" height="100%"><ScatterChart margin={{ left: 8, right: 18 }}><CartesianGrid stroke="#eee" /><XAxis type="number" dataKey="area" name="Area" axisLine={false} tickLine={false} /><YAxis type="number" dataKey="revenue" name="Revenue (M)" axisLine={false} tickLine={false} /><Tooltip cursor={{ strokeDasharray: "3 3" }} /><Legend />{typeGroups.map((g, i) => <Scatter key={g.type} name={g.type} data={g.rows} fill={["#a3a3a3", "#525252", "#171717"][i]} />)}</ScatterChart></ResponsiveContainer></CardContent></Card>
    <div className="grid gap-4 xl:grid-cols-2"><Card><CardHeader><CardTitle>Property groups</CardTitle><CardDescription>Total revenue after whitespace normalization</CardDescription></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={property}><CartesianGrid vertical={false} stroke="#eee" /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis tickFormatter={(v) => compactMoney.format(Number(v))} axisLine={false} tickLine={false} /><Tooltip formatter={(v) => money.format(Number(v))} /><Bar dataKey="totalRevenue" fill="#262626" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Highest revenue efficiency</CardTitle><CardDescription>Top 10 stores by Revenue / Area</CardDescription></CardHeader><CardContent><div className="space-y-2">{topEfficiency.map((r, i) => <div key={r.storeNumber} className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2"><div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold">{i+1}</span><div><p className="text-sm font-medium">Store #{r.storeNumber}</p><p className="text-xs text-neutral-500">{r.type} · {money.format(r.area)} area</p></div></div><div className="text-right"><p className="text-sm font-semibold">{money.format(r.revenuePerArea)}</p><p className="text-xs text-neutral-500">per area</p></div></div>)}</div></CardContent></Card></div>
  </div>
}

function RevenueModel() {
  const [area, setArea] = useState(1500)
  const [checkout, setCheckout] = useState(5)
  const [property, setProperty] = useState("Owned")
  const [type, setType] = useState("Extra")
  const [age, setAge] = useState("New")
  const [prediction, setPrediction] = useState<number | null>(null)
  const cv = modelMetrics.cv
  const run = () => setPrediction(predictRevenue({ area, checkout, property, type, age }))
  return <div className="space-y-6">
    <section><Badge>Leakage-safe regression</Badge><h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Revenue model</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">Models use area, checkout capacity, property, type, and store age. RevToArea is excluded because it contains the target by construction.</p></section>
    <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Best CV R²" value={modelMetrics.cv.find((r) => r.model === "Ridge Regression")!.r2.toFixed(3)} detail="5-fold Ridge mean" icon={Activity} /><StatCard label="Holdout MAE" value={compactMoney.format(modelMetrics.holdout.mae)} detail="Ridge · 80/20 split" icon={Gauge} /><StatCard label="Holdout R²" value={modelMetrics.holdout.r2.toFixed(3)} detail="Snapshot, not model selection" icon={BarChart3} /></div>
    <Card><CardHeader><CardTitle>5-fold cross-validation</CardTitle><CardDescription>Mean metrics across identical shuffled folds</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500"><tr><th className="px-4 py-3">Model</th><th className="px-4 py-3">MAE</th><th className="px-4 py-3">RMSE</th><th className="px-4 py-3">Mean R²</th><th className="px-4 py-3">R² std</th></tr></thead><tbody>{cv.map((r) => <tr key={r.model} className="border-t border-neutral-200"><td className="px-4 py-3 font-medium">{r.model}</td><td className="px-4 py-3">{compactMoney.format(r.mae)}</td><td className="px-4 py-3">{compactMoney.format(r.rmse)}</td><td className="px-4 py-3">{r.r2.toFixed(3)}</td><td className="px-4 py-3">{r.r2Std.toFixed(3)}</td></tr>)}</tbody></table></div></CardContent></Card>
    <div className="grid gap-4 xl:grid-cols-2"><Card><CardHeader><CardTitle>Revenue estimator</CardTitle><CardDescription>Browser-side Ridge model fitted on the cleaned 118-store dataset</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><div><Label>Store area</Label><Input type="number" min="1" value={area} onChange={(e) => setArea(Number(e.target.value))} /></div><div><Label>Checkout count</Label><Input type="number" min="1" value={checkout} onChange={(e) => setCheckout(Number(e.target.value))} /></div><div><Label>Property</Label><Select value={property} onChange={(e) => setProperty(e.target.value)}>{modelMetrics.categorical.categories[0].map((v) => <option key={v}>{v}</option>)}</Select></div><div><Label>Type</Label><Select value={type} onChange={(e) => setType(e.target.value)}>{modelMetrics.categorical.categories[1].map((v) => <option key={v}>{v}</option>)}</Select></div><div><Label>Old / New</Label><Select value={age} onChange={(e) => setAge(e.target.value)}>{modelMetrics.categorical.categories[2].map((v) => <option key={v}>{v}</option>)}</Select></div><div className="flex items-end"><Button className="w-full" onClick={run}><Calculator className="h-4 w-4" />Estimate revenue</Button></div></CardContent></Card><Card><CardHeader><CardTitle>Estimated revenue</CardTitle><CardDescription>Educational portfolio estimate, not a production forecast</CardDescription></CardHeader><CardContent>{prediction == null ? <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center"><ShoppingCart className="mb-3 h-8 w-8 text-neutral-300" /><p className="text-sm font-medium">No estimate yet</p><p className="mt-1 text-xs text-neutral-500">Choose a scenario and run the exported Ridge model.</p></div> : <div className="rounded-xl bg-neutral-950 p-6 text-white"><p className="text-xs uppercase tracking-[.18em] text-neutral-400">Estimated revenue</p><p className="mt-3 text-4xl font-semibold tracking-tight">{money.format(Math.max(0, prediction))}</p><p className="mt-4 text-sm leading-6 text-neutral-300">The dashboard reproduces the Ridge coefficients and preprocessing parameters exported from Python. Small-sample uncertainty remains substantial.</p></div>}</CardContent></Card></div>
  </div>
}

function About() {
  return <div className="space-y-6">
    <section><Badge>Portfolio project</Badge><h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">About this analysis</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">A product-style presentation of a small retail regression study, with all claims derived from the supplied Stores.csv dataset.</p></section>
    <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Data & methodology</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-neutral-600"><p><b className="text-neutral-900">Rows:</b> 118 stores</p><p><b className="text-neutral-900">Data quality:</b> 12 missing checkout values and whitespace inconsistencies in categorical labels.</p><p><b className="text-neutral-900">Modeling:</b> numerical imputation/scaling + categorical one-hot encoding inside scikit-learn pipelines.</p><p><b className="text-neutral-900">Validation:</b> 5-fold cross-validation plus a fixed holdout snapshot.</p></CardContent></Card><Card><CardHeader><CardTitle>Limitations</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-neutral-600"><p>The sample is small and cross-validation scores vary noticeably across folds.</p><p>No location, traffic, promotions, product mix, or time-series information is available.</p><p>Relationships are observational; coefficients should not be read as causal effects.</p></CardContent></Card></div>
    <Card><CardHeader><CardTitle>Project links</CardTitle><CardDescription>Notebook, source code, and live deployment</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-3"><a className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white" href={repoUrl} target="_blank" rel="noreferrer"><Code2 className="h-4 w-4" />Source code</a><a className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium" href={liveUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" />Live route</a></CardContent></Card>
  </div>
}

export default function App() {
  const [view, setView] = useState<View>("overview")
  const [mobileOpen, setMobileOpen] = useState(false)
  return <div className="min-h-screen bg-neutral-50 text-neutral-950"><div className="flex"><Sidebar view={view} onView={setView} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><main className="min-w-0 flex-1"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/90 px-4 backdrop-blur md:px-6"><button className="rounded-md border border-neutral-200 p-2 md:hidden" onClick={() => setMobileOpen(true)}>{mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button><div className="hidden items-center gap-2 text-sm text-neutral-500 md:flex"><Building2 className="h-4 w-4" /> Retail Store Sales Analysis</div><a className="inline-flex items-center gap-2 text-sm font-medium" href={repoUrl} target="_blank" rel="noreferrer"><Code2 className="h-4 w-4" />GitHub</a></header><div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">{view === "overview" && <Overview />}{view === "explorer" && <Explorer />}{view === "performance" && <Performance />}{view === "model" && <RevenueModel />}{view === "about" && <About />}</div></main></div></div>
}
