import { useMemo, useState } from "react"
import {
  Activity,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Gauge,
  Info,
  LayoutDashboard,
  Menu,
  Scale,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { StatCard } from "@/components/dashboard/StatCard"
import {
  analyzeCreditRisk,
  type CreditHistory,
  type RiskResult,
} from "@/lib/riskAnalyzer"

type View = "overview" | "analyzer" | "models" | "imbalance" | "about"

const project = {
  repoUrl:
    "https://github.com/mr-amirasgari/kaggle-data-science-projects/tree/main/loan-credit-analysis",
  rootRepoUrl:
    "https://github.com/mr-amirasgari/kaggle-data-science-projects",
  liveUrl:
    "https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/",
}

const nav = [
  { id: "overview" as View, label: "Overview", icon: LayoutDashboard },
  { id: "analyzer" as View, label: "Risk Analyzer", icon: Gauge },
  { id: "models" as View, label: "Model Lab", icon: BrainCircuit },
  { id: "imbalance" as View, label: "Class Imbalance", icon: Scale },
  { id: "about" as View, label: "About", icon: Info },
]

const metricData = [
  { name: "Recall", value: 44.59 },
  { name: "F1 × 100", value: 33.09 },
]

const modelRows = [
  {
    model: "Logistic Regression",
    sampling: "SMOTE",
    recall: "44.59%",
    f1: "0.3309",
    status: "Reported result",
  },
  {
    model: "Random Forest",
    sampling: "Evaluated",
    recall: "—",
    f1: "—",
    status: "Compared",
  },
  {
    model: "XGBoost",
    sampling: "Evaluated",
    recall: "—",
    f1: "—",
    status: "Compared",
  },
]

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/90 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm font-semibold text-neutral-950">
            Loan Credit Analysis
          </p>
          <p className="text-xs text-neutral-500">
            Credit Risk · Imbalanced Classification
          </p>
        </div>
      </div>

      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-8 items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-900 transition hover:bg-neutral-50"
      >
        <Code2 className="h-4 w-4" />
        GitHub
      </a>
    </header>
  )
}

function Sidebar({
  view,
  setView,
  mobile,
  close,
}: {
  view: View
  setView: (view: View) => void
  mobile?: boolean
  close?: () => void
}) {
  return (
    <aside
      className={`${
        mobile
          ? "fixed inset-y-0 left-0 z-50"
          : "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex"
      } w-64 flex-col border-r border-neutral-200 bg-white`}
    >
      <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white">
          <WalletCards className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">Credit ML</div>
          <div className="text-xs text-neutral-500">FinTech dashboard</div>
        </div>

        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setView(id)
              close?.()
            }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
              view === id
                ? "bg-neutral-100 text-neutral-950"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="m-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          Portfolio-ready
        </div>
        <p className="text-xs leading-5 text-neutral-500">
          Static GitHub Pages dashboard with transparent browser-side scenario
          scoring.
        </p>
      </div>
    </aside>
  )
}

function Overview() {
  return (
    <div className="space-y-6">
      <section>
        <Badge>Live dashboard</Badge>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Loan credit analysis overview
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          A product-style view of an imbalanced binary-classification project
          using Logistic Regression, Random Forest, XGBoost, and SMOTE.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Problem type"
          value="Binary"
          detail="Imbalanced classification"
          icon={Database}
        />
        <StatCard
          label="Models compared"
          value="3"
          detail="Logistic Regression · Random Forest · XGBoost"
          icon={BrainCircuit}
        />
        <StatCard
          label="Reported recall"
          value="44.59%"
          detail="Logistic Regression after SMOTE"
          icon={Activity}
        />
        <StatCard
          label="Reported F1"
          value="0.3309"
          detail="Post-SMOTE Logistic Regression"
          icon={ShieldCheck}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <Card>
          <CardHeader>
            <CardTitle>Reported model metrics</CardTitle>
            <CardDescription>
              Recall and F1 values explicitly reported for the post-SMOTE
              Logistic Regression result
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metricData}
                layout="vertical"
                margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
              >
                <CartesianGrid horizontal={false} stroke="#eeeeee" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={76}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#fafafa" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e5e5e5",
                    boxShadow: "0 8px 30px rgba(0,0,0,.06)",
                  }}
                />
                <Bar dataKey="value" fill="#171717" radius={[0, 5, 5, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project workflow</CardTitle>
            <CardDescription>
              Core pipeline represented in the repository summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["01", "Data cleaning"],
              ["02", "Feature transformation"],
              ["03", "Model comparison"],
              ["04", "SMOTE balancing"],
              ["05", "Evaluation"],
            ].map(([n, label]) => (
              <div
                key={n}
                className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold">
                  {n}
                </span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RiskAnalyzer() {
  const [annualIncome, setAnnualIncome] = useState(75000)
  const [loanAmount, setLoanAmount] = useState(25000)
  const [termMonths, setTermMonths] = useState(36)
  const [dti, setDti] = useState(28)
  const [creditHistory, setCreditHistory] =
    useState<CreditHistory>("fair")
  const [employmentYears, setEmploymentYears] = useState(4)
  const [result, setResult] = useState<RiskResult | null>(null)
  const [error, setError] = useState("")

  function run() {
    try {
      const next = analyzeCreditRisk({
        annualIncome,
        loanAmount,
        termMonths,
        dti,
        creditHistory,
        employmentYears,
      })
      setResult(next)
      setError("")
    } catch (err) {
      setResult(null)
      setError(err instanceof Error ? err.message : "Invalid input")
    }
  }

  const gaugeData = useMemo(() => {
    if (!result) return [{ name: "Risk", value: 0 }, { name: "Remaining", value: 100 }]
    return [
      { name: "Risk", value: result.score },
      { name: "Remaining", value: 100 - result.score },
    ]
  }, [result])

  return (
    <div className="space-y-6">
      <section>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Interactive</Badge>
          <Badge className="bg-amber-50 text-amber-800">Scenario tool</Badge>
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Credit risk scenario analyzer
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          Explore how common credit-risk factors change a transparent demo risk
          score. This is intentionally separate from the trained notebook model
          because its fitted coefficients and preprocessing artifacts are not
          bundled into this frontend.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Applicant scenario</CardTitle>
            <CardDescription>
              Adjust the inputs and evaluate the risk profile in-browser
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="income">Annual income</Label>
              <Input
                id="income"
                type="number"
                min={1}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan">Loan amount</Label>
              <Input
                id="loan"
                type="number"
                min={1}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Loan term (months)</Label>
              <Input
                id="term"
                type="number"
                min={6}
                max={120}
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dti">Debt-to-income ratio (%)</Label>
              <Input
                id="dti"
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={dti}
                onChange={(e) => setDti(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="history">Credit history</Label>
              <Select
                id="history"
                value={creditHistory}
                onChange={(e) =>
                  setCreditHistory(e.target.value as CreditHistory)
                }
              >
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employment">Employment years</Label>
              <Input
                id="employment"
                type="number"
                min={0}
                max={60}
                step="0.5"
                value={employmentYears}
                onChange={(e) => setEmploymentYears(Number(e.target.value))}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 sm:col-span-2">{error}</p>
            )}

            <div className="sm:col-span-2">
              <Button onClick={run} className="w-full sm:w-auto">
                <Gauge className="h-4 w-4" />
                Analyze scenario
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk profile</CardTitle>
            <CardDescription>
              Transparent score and contributing factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center">
                <Gauge className="mb-3 h-8 w-8 text-neutral-300" />
                <p className="text-sm font-medium">No scenario analyzed yet</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Fill the form and run the analyzer.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
                  <div className="relative h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gaugeData}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius={52}
                          outerRadius={68}
                          stroke="none"
                        >
                          <Cell fill="#171717" />
                          <Cell fill="#eeeeee" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-semibold">{result.score}</span>
                      <span className="text-[11px] text-neutral-500">/ 100</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                      Scenario band
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">
                      {result.band}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      A transparent browser-side scenario score, not a probability
                      produced by the fitted ML model.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Contributing factors
                  </p>
                  <div className="space-y-2">
                    {result.factors.map((factor, index) => (
                      <div
                        key={`${factor.label}-${index}`}
                        className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium">{factor.label}</p>
                          <p className="mt-1 text-xs text-neutral-500">
                            {factor.detail}
                          </p>
                        </div>
                        <Badge>+{factor.impact}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <p className="text-xs leading-5 text-neutral-500">
        Educational portfolio demo only. It is not a lending decision, credit
        score, financial advice, or a substitute for the trained project model.
      </p>
    </div>
  )
}

function Models() {
  return (
    <div className="space-y-6">
      <section>
        <Badge>Model comparison</Badge>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Model lab
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          The project compares Logistic Regression, Random Forest, and XGBoost,
          with SMOTE used to address class imbalance.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Evaluation snapshot</CardTitle>
          <CardDescription>
            Only metrics explicitly reported by the project are populated; other
            cells are intentionally left blank instead of inventing values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Sampling</th>
                  <th className="px-4 py-3">Recall</th>
                  <th className="px-4 py-3">F1</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {modelRows.map((row) => (
                  <tr
                    key={row.model}
                    className="border-t border-neutral-200"
                  >
                    <td className="px-4 py-3 font-medium">{row.model}</td>
                    <td className="px-4 py-3">{row.sampling}</td>
                    <td className="px-4 py-3">{row.recall}</td>
                    <td className="px-4 py-3">{row.f1}</td>
                    <td className="px-4 py-3">
                      <Badge>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Logistic Regression",
            body: "Interpretable linear classifier and the model with the explicitly reported post-SMOTE result.",
          },
          {
            title: "Random Forest",
            body: "Tree ensemble included in the project model comparison.",
          },
          {
            title: "XGBoost",
            body: "Boosted-tree model included for non-linear comparison.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-neutral-600">
              {item.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Imbalance() {
  return (
    <div className="space-y-6">
      <section>
        <Badge>SMOTE</Badge>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Class imbalance strategy
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          The project treats imbalance as a modeling problem rather than relying
          on accuracy alone.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>1. Original data</CardTitle>
            <CardDescription>Minority class is under-represented</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs text-neutral-500">
                  <span>Majority class</span>
                  <span>dominant</span>
                </div>
                <div className="h-3 rounded-full bg-neutral-900" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-neutral-500">
                  <span>Minority class</span>
                  <span>under-represented</span>
                </div>
                <div className="h-3 w-2/5 rounded-full bg-neutral-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. SMOTE</CardTitle>
            <CardDescription>Synthetic minority oversampling</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-28 items-center justify-center">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-4 text-center">
              <Scale className="mx-auto h-6 w-6 text-neutral-700" />
              <p className="mt-2 text-sm font-medium">Balance training signal</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Re-evaluate</CardTitle>
            <CardDescription>Focus on minority-sensitive metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-neutral-200 p-3">
              <div className="text-xs text-neutral-500">Recall</div>
              <div className="mt-1 text-xl font-semibold">44.59%</div>
            </div>
            <div className="rounded-lg border border-neutral-200 p-3">
              <div className="text-xs text-neutral-500">F1 score</div>
              <div className="mt-1 text-xl font-semibold">0.3309</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Why this matters</CardTitle>
          <CardDescription>
            Imbalanced classification can make headline accuracy misleading
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            ["Recall", "How many positive/minority cases the classifier retrieves."],
            ["F1 score", "Balance between precision and recall in one metric."],
            ["SMOTE", "A training-set resampling technique used before model evaluation."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-neutral-200 p-4">
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-500">{body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function About() {
  return (
    <div className="space-y-6">
      <section>
        <Badge>Portfolio project</Badge>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          About this dashboard
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          A shadcn-inspired product interface for presenting the
          loan-credit-analysis notebook as a deployable portfolio project.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project scope</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-neutral-600">
            <p>
              <b className="text-neutral-900">Task:</b> imbalanced binary
              classification
            </p>
            <p>
              <b className="text-neutral-900">Models:</b> Logistic Regression,
              Random Forest, XGBoost
            </p>
            <p>
              <b className="text-neutral-900">Balancing:</b> SMOTE
            </p>
            <p>
              <b className="text-neutral-900">Reported result:</b> 44.59% recall
              and 0.3309 F1 for Logistic Regression after SMOTE
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frontend stack</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "Vite",
              "Tailwind CSS",
              "shadcn-style",
              "Recharts",
              "Vitest",
              "GitHub Pages",
            ].map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Code2 className="h-4 w-4" />
          Open project
        </a>
        <a
          href={project.liveUrl}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
        >
          <BriefcaseBusiness className="h-4 w-4" />
          Live dashboard
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<View>("overview")
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-950">
      <Sidebar view={view} setView={setView} />

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <Sidebar
            mobile
            view={view}
            setView={setView}
            close={() => setMobileOpen(false)}
          />
        </>
      )}

      <div className="lg:pl-64">
        <Header onMenu={() => setMobileOpen(true)} />

        <main className="mx-auto max-w-[1500px] p-4 md:p-6 lg:p-8">
          {view === "overview" && <Overview />}
          {view === "analyzer" && <RiskAnalyzer />}
          {view === "models" && <Models />}
          {view === "imbalance" && <Imbalance />}
          {view === "about" && <About />}
        </main>
      </div>
    </div>
  )
}
