import { useMemo, useState } from "react"
import {
  Activity,
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  HeartPulse,
  Info,
  LayoutDashboard,
  Menu,
  Microscope,
  Pill,
  Rows3,
  Sparkles,
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
  Scatter,
  ScatterChart,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatCard } from "@/components/dashboard/StatCard"

import { drugData } from "@/data/drugData"
import { projectMeta } from "@/data/projectMeta"

import {
  predictDrug,
  type BloodPressure,
  type Cholesterol,
  type DrugClass,
  type Sex,
} from "@/lib/predictDrug"

type View = "overview" | "predictor" | "explorer" | "models" | "about"

const nav = [
  {
    id: "overview" as View,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "predictor" as View,
    label: "Predictor",
    icon: BrainCircuit,
  },
  {
    id: "explorer" as View,
    label: "Data Explorer",
    icon: BarChart3,
  },
  {
    id: "models" as View,
    label: "Models",
    icon: Microscope,
  },
  {
    id: "about" as View,
    label: "About",
    icon: Info,
  },
]

const drugPalette: Record<DrugClass, string> = {
  drugA: "#171717",
  drugB: "#525252",
  drugC: "#737373",
  drugX: "#a3a3a3",
  drugY: "#d4d4d4",
}

function aggregate<T extends string>(
  key: "Drug" | "BP",
  order: T[]
) {
  const counts = new Map<string, number>()

  drugData.forEach((row) => {
    counts.set(
      row[key],
      (counts.get(row[key]) || 0) + 1
    )
  })

  return order.map((name) => ({
    name,
    value: counts.get(name) || 0,
  }))
}

function Header({
  onMenu,
}: {
  onMenu: () => void
}) {
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
            Drug Classification
          </p>

          <p className="text-xs text-neutral-500">
            Machine Learning · Healthcare Analytics
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a
          href={projectMeta.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Code2 className="h-4 w-4" />
          GitHub
        </a>
      </Button>
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
  setView: (v: View) => void
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
          <Pill className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">
            Drug ML
          </div>

          <div className="text-xs text-neutral-500">
            Portfolio dashboard
          </div>
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
        {nav.map(
          ({
            id,
            label,
            icon: Icon,
          }) => (
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
          )
        )}
      </nav>

      <div className="m-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />

          Portfolio-ready
        </div>

        <p className="text-xs leading-5 text-neutral-500">
          Static browser inference. No backend required for
          GitHub Pages.
        </p>
      </div>
    </aside>
  )
}

function Overview() {
  const distribution = useMemo(
    () =>
      aggregate("Drug", [
        "drugY",
        "drugX",
        "drugA",
        "drugB",
        "drugC",
      ]),
    []
  )

  const bp = useMemo(
    () =>
      aggregate("BP", [
        "HIGH",
        "NORMAL",
        "LOW",
      ]),
    []
  )

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-1 flex items-center gap-2">
          <Badge>
            Live dashboard
          </Badge>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Drug classification overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          A portfolio-grade view of the Drug200 classification
          project, from dataset structure to interactive
          browser-side prediction.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Patients"
          value="200"
          detail="Rows in Drug200"
          icon={Rows3}
        />

        <StatCard
          label="Features"
          value="5"
          detail="Age, Sex, BP, Cholesterol, Na/K"
          icon={Database}
        />

        <StatCard
          label="Classes"
          value="5"
          detail="drugA · drugB · drugC · drugX · drugY"
          icon={Pill}
        />

        <StatCard
          label="Best test accuracy"
          value="100%"
          detail="Decision Tree snapshot"
          icon={Activity}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>
              Drug distribution
            </CardTitle>

            <CardDescription>
              Class balance across all 200 records
            </CardDescription>
          </CardHeader>

          <CardContent className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={distribution}
                margin={{
                  top: 8,
                  right: 8,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#eeeeee"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "#fafafa",
                  }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e5e5e5",
                    boxShadow:
                      "0 8px 30px rgba(0,0,0,.06)",
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[5, 5, 0, 0]}
                  fill="#171717"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Blood pressure mix
            </CardTitle>

            <CardDescription>
              Dataset composition by BP level
            </CardDescription>
          </CardHeader>

          <CardContent className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={bp}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {bp.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        [
                          "#171717",
                          "#737373",
                          "#d4d4d4",
                        ][i]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border:
                      "1px solid #e5e5e5",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Predictor() {
  const [age, setAge] =
    useState(43)

  const [sex, setSex] =
    useState<Sex>("M")

  const [bp, setBp] =
    useState<BloodPressure>("HIGH")

  const [
    cholesterol,
    setCholesterol,
  ] =
    useState<Cholesterol>("HIGH")

  const [naToK, setNaToK] =
    useState(13.972)

  const [result, setResult] =
    useState<
      ReturnType<typeof predictDrug> | null
    >(null)

  const [error, setError] =
    useState("")

  function run() {
    try {
      setResult(
        predictDrug({
          age,
          sex,
          bp,
          cholesterol,
          naToK,
        })
      )

      setError("")
    } catch (e) {
      setResult(null)

      setError(
        e instanceof Error
          ? e.message
          : "Invalid input"
      )
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <Badge>
          Interactive
        </Badge>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Drug predictor
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Enter patient attributes and run the decision logic
          directly in your browser.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>
              Patient information
            </CardTitle>

            <CardDescription>
              Five input features used by the project dataset
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">
                Age
              </Label>

              <Input
                id="age"
                type="number"
                value={age}
                min={1}
                max={120}
                onChange={(e) =>
                  setAge(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>
                Sex
              </Label>

              <Select
                value={sex}
                onValueChange={(v) =>
                  setSex(v as Sex)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="F">
                    Female
                  </SelectItem>

                  <SelectItem value="M">
                    Male
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Blood pressure
              </Label>

              <Select
                value={bp}
                onValueChange={(v) =>
                  setBp(
                    v as BloodPressure
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="HIGH">
                    High
                  </SelectItem>

                  <SelectItem value="NORMAL">
                    Normal
                  </SelectItem>

                  <SelectItem value="LOW">
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Cholesterol
              </Label>

              <Select
                value={cholesterol}
                onValueChange={(v) =>
                  setCholesterol(
                    v as Cholesterol
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="HIGH">
                    High
                  </SelectItem>

                  <SelectItem value="NORMAL">
                    Normal
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="natok">
                Sodium / Potassium ratio
                (Na/K)
              </Label>

              <Input
                id="natok"
                type="number"
                step="0.001"
                value={naToK}
                onChange={(e) =>
                  setNaToK(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 sm:col-span-2">
                {error}
              </p>
            )}

            <div className="sm:col-span-2">
              <Button
                className="w-full sm:w-auto"
                onClick={run}
              >
                <BrainCircuit className="h-4 w-4" />

                Predict drug
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>
              Prediction
            </CardTitle>

            <CardDescription>
              Decision-tree output and traversal path
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!result ? (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center">
                <HeartPulse className="mb-3 h-8 w-8 text-neutral-300" />

                <p className="text-sm font-medium">
                  No prediction yet
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Fill the form and run the model.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-lg border border-neutral-200 bg-neutral-950 p-5 text-white">
                  <div className="text-xs uppercase tracking-[.18em] text-neutral-400">
                    Predicted class
                  </div>

                  <div className="mt-2 text-4xl font-semibold tracking-tight">
                    {result.drug}
                  </div>

                  <div className="mt-3 inline-flex rounded-md bg-white/10 px-2 py-1 text-xs">
                    Confidence label ·{" "}
                    {result.confidenceLabel}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Decision path
                  </p>

                  <div className="space-y-2">
                    {result.path.map(
                      (step, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-md border border-neutral-200 px-3 py-2 text-sm"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-semibold">
                            {i + 1}
                          </span>

                          {step}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <p className="text-xs leading-5 text-neutral-500">
        Educational portfolio demo only. It is not medical
        advice, a diagnostic tool, or a prescription system.
      </p>
    </div>
  )
}

function Explorer() {
  const ageBins = useMemo(
    () => {
      const bins = [
        [10, 19],
        [20, 29],
        [30, 39],
        [40, 49],
        [50, 59],
        [60, 69],
        [70, 79],
      ]

      return bins.map(
        ([a, b]) => ({
          name: `${a}–${b}`,
          value: drugData.filter(
            (r) =>
              r.Age >= a &&
              r.Age <= b
          ).length,
        })
      )
    },
    []
  )

  const scatter = useMemo(
    () =>
      drugData.map(
        (r, i) => ({
          x: r.Age,
          y: r.Na_to_K,
          drug: r.Drug,
          i,
        })
      ),
    []
  )

  const distribution = useMemo(
    () =>
      aggregate("Drug", [
        "drugY",
        "drugX",
        "drugA",
        "drugB",
        "drugC",
      ]),
    []
  )

  return (
    <div className="space-y-6">
      <section>
        <Badge>
          200 records
        </Badge>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Data explorer
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Explore class balance, age structure, and the strong
          Na/K separation in the dataset.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Age distribution
            </CardTitle>

            <CardDescription>
              Patients grouped into 10-year bins
            </CardDescription>
          </CardHeader>

          <CardContent className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={ageBins}
                margin={{
                  left: -20,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#eee"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#171717"
                  radius={[
                    5,
                    5,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Age vs Na/K
            </CardTitle>

            <CardDescription>
              Every patient, grouped visually by drug class
            </CardDescription>
          </CardHeader>

          <CardContent className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <ScatterChart
                margin={{
                  left: -12,
                  right: 12,
                }}
              >
                <CartesianGrid stroke="#eee" />

                <XAxis
                  type="number"
                  dataKey="x"
                  name="Age"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="number"
                  dataKey="y"
                  name="Na/K"
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{
                    strokeDasharray:
                      "3 3",
                  }}
                />

                <Scatter
                  data={scatter}
                >
                  {scatter.map(
                    (p) => (
                      <Cell
                        key={p.i}
                        fill={
                          drugPalette[
                            p.drug as DrugClass
                          ]
                        }
                      />
                    )
                  )}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Class table
          </CardTitle>

          <CardDescription>
            Actual counts computed from the bundled 200-row
            dataset
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-lg border border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3">
                    Class
                  </th>

                  <th className="px-4 py-3">
                    Records
                  </th>

                  <th className="px-4 py-3">
                    Share
                  </th>
                </tr>
              </thead>

              <tbody>
                {distribution.map(
                  (d) => (
                    <tr
                      key={d.name}
                      className="border-t border-neutral-200"
                    >
                      <td className="px-4 py-3 font-medium">
                        {d.name}
                      </td>

                      <td className="px-4 py-3">
                        {d.value}
                      </td>

                      <td className="px-4 py-3 text-neutral-500">
                        {(
                          d.value /
                          2
                        ).toFixed(
                          1
                        )}
                        %
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Models() {
  const rows = [
    {
      model:
        "Decision Tree",
      train:
        "100%",
      test:
        "100%",
      status:
        "Selected",
    },
    {
      model:
        "Logistic Regression",
      train:
        "94%",
      test:
        "98%",
      status:
        "Baseline",
    },
  ]

  return (
    <div className="space-y-6">
      <section>
        <Badge>
          Model comparison
        </Badge>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Model performance
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          A concise comparison of the project models and the
          browser inference strategy.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Evaluation snapshot
          </CardTitle>

          <CardDescription>
            Training and test accuracy reported for the project
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-lg border border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3">
                    Model
                  </th>

                  <th className="px-4 py-3">
                    Train
                  </th>

                  <th className="px-4 py-3">
                    Test
                  </th>

                  <th className="px-4 py-3">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map(
                  (r) => (
                    <tr
                      key={
                        r.model
                      }
                      className="border-t border-neutral-200"
                    >
                      <td className="px-4 py-3 font-medium">
                        {
                          r.model
                        }
                      </td>

                      <td className="px-4 py-3">
                        {
                          r.train
                        }
                      </td>

                      <td className="px-4 py-3">
                        {
                          r.test
                        }
                      </td>

                      <td className="px-4 py-3">
                        <Badge>
                          {
                            r.status
                          }
                        </Badge>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Why Decision Tree?
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm leading-6 text-neutral-600">
            The model is easy to interpret and its compact
            branching logic can be represented directly in
            JavaScript, making it ideal for a static GitHub
            Pages demo with no server.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Deployment architecture
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-neutral-600">
            <div className="rounded-md border border-neutral-200 p-3">
              <b className="text-neutral-900">
                Notebook
              </b>{" "}
              → training & evaluation
            </div>

            <div className="rounded-md border border-neutral-200 p-3">
              <b className="text-neutral-900">
                React UI
              </b>{" "}
              → visualization & form
            </div>

            <div className="rounded-md border border-neutral-200 p-3">
              <b className="text-neutral-900">
                Browser inference
              </b>{" "}
              → static decision rules
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="space-y-6">
      <section>
        <Badge>
          Portfolio project
        </Badge>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          About this dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          A polished interface for presenting the data-science
          workflow as a product instead of only a notebook.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Dataset
            </CardTitle>

            <CardDescription>
              Drug200 classification data
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-neutral-600">
            <p>
              <b className="text-neutral-900">
                Rows:
              </b>{" "}
              200
            </p>

            <p>
              <b className="text-neutral-900">
                Features:
              </b>{" "}
              Age, Sex, Blood Pressure, Cholesterol, Na/K ratio
            </p>

            <p>
              <b className="text-neutral-900">
                Target:
              </b>{" "}
              drugA, drugB, drugC, drugX, drugY
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Stack
            </CardTitle>

            <CardDescription>
              Static, portfolio-friendly frontend
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-2">
            <Badge>
              React
            </Badge>

            <Badge>
              TypeScript
            </Badge>

            <Badge>
              Vite
            </Badge>

            <Badge>
              Tailwind CSS
            </Badge>

            <Badge>
              shadcn structure
            </Badge>

            <Badge>
              Radix UI
            </Badge>

            <Badge>
              Recharts
            </Badge>

            <Badge>
              GitHub Pages
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Source code
          </CardTitle>

          <CardDescription>
            Keep the dashboard next to your notebook in the
            same repository.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <a
              href={projectMeta.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 className="h-4 w-4" />

              Open repository
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function App() {
  const [view, setView] =
    useState<View>("overview")

  const [mobileOpen, setMobileOpen] =
    useState(false)

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-950">
      <Sidebar
        view={view}
        setView={setView}
      />

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] lg:hidden"
            onClick={() =>
              setMobileOpen(false)
            }
          />

          <Sidebar
            mobile
            view={view}
            setView={setView}
            close={() =>
              setMobileOpen(false)
            }
          />
        </>
      )}

      <div className="lg:pl-64">
        <Header
          onMenu={() =>
            setMobileOpen(true)
          }
        />

        <main className="mx-auto max-w-[1500px] p-4 md:p-6 lg:p-8">
          {view ===
            "overview" && (
            <Overview />
          )}

          {view ===
            "predictor" && (
            <Predictor />
          )}

          {view ===
            "explorer" && (
            <Explorer />
          )}

          {view ===
            "models" && (
            <Models />
          )}

          {view ===
            "about" && (
            <About />
          )}
        </main>
      </div>
    </div>
  )
}