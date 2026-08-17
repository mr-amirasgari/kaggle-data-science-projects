export type CreditHistory = "good" | "fair" | "poor"
export type RiskBand = "Low" | "Moderate" | "Elevated" | "High"

export type RiskInput = {
  annualIncome: number
  loanAmount: number
  termMonths: number
  dti: number
  creditHistory: CreditHistory
  employmentYears: number
}

export type RiskFactor = {
  label: string
  impact: number
  detail: string
}

export type RiskResult = {
  score: number
  band: RiskBand
  factors: RiskFactor[]
}

function bandForScore(score: number): RiskBand {
  if (score <= 20) return "Low"
  if (score <= 45) return "Moderate"
  if (score <= 65) return "Elevated"
  return "High"
}

export function analyzeCreditRisk(input: RiskInput): RiskResult {
  const {
    annualIncome,
    loanAmount,
    termMonths,
    dti,
    creditHistory,
    employmentYears,
  } = input

  if (!Number.isFinite(annualIncome) || annualIncome <= 0) {
    throw new Error("Annual income must be greater than 0.")
  }

  if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
    throw new Error("Loan amount must be greater than 0.")
  }

  if (!Number.isFinite(termMonths) || termMonths < 6 || termMonths > 120) {
    throw new Error("Loan term must be between 6 and 120 months.")
  }

  if (!Number.isFinite(dti) || dti < 0 || dti > 100) {
    throw new Error("Debt-to-income ratio must be between 0 and 100.")
  }

  if (!Number.isFinite(employmentYears) || employmentYears < 0 || employmentYears > 60) {
    throw new Error("Employment years must be between 0 and 60.")
  }

  const factors: RiskFactor[] = []
  let score = 0

  if (dti >= 50) {
    score += 35
    factors.push({ label: "Very high DTI", impact: 35, detail: `${dti.toFixed(1)}% debt-to-income` })
  } else if (dti >= 40) {
    score += 25
    factors.push({ label: "High DTI", impact: 25, detail: `${dti.toFixed(1)}% debt-to-income` })
  } else if (dti >= 30) {
    score += 15
    factors.push({ label: "Elevated DTI", impact: 15, detail: `${dti.toFixed(1)}% debt-to-income` })
  } else if (dti >= 20) {
    score += 8
    factors.push({ label: "Moderate DTI", impact: 8, detail: `${dti.toFixed(1)}% debt-to-income` })
  }

  const loanToIncome = loanAmount / annualIncome
  if (loanToIncome >= 0.8) {
    score += 25
    factors.push({ label: "Very high loan burden", impact: 25, detail: `${(loanToIncome * 100).toFixed(0)}% of annual income` })
  } else if (loanToIncome >= 0.5) {
    score += 15
    factors.push({ label: "High loan burden", impact: 15, detail: `${(loanToIncome * 100).toFixed(0)}% of annual income` })
  } else if (loanToIncome >= 0.3) {
    score += 8
    factors.push({ label: "Moderate loan burden", impact: 8, detail: `${(loanToIncome * 100).toFixed(0)}% of annual income` })
  }

  if (creditHistory === "poor") {
    score += 30
    factors.push({ label: "Poor credit history", impact: 30, detail: "Strong negative scenario factor" })
  } else if (creditHistory === "fair") {
    score += 15
    factors.push({ label: "Fair credit history", impact: 15, detail: "Moderate negative scenario factor" })
  }

  if (employmentYears < 1) {
    score += 12
    factors.push({ label: "Very short employment", impact: 12, detail: `${employmentYears.toFixed(1)} years` })
  } else if (employmentYears < 3) {
    score += 6
    factors.push({ label: "Short employment history", impact: 6, detail: `${employmentYears.toFixed(1)} years` })
  }

  if (termMonths > 60) {
    score += 8
    factors.push({ label: "Long loan term", impact: 8, detail: `${termMonths} months` })
  } else if (termMonths > 36) {
    score += 4
    factors.push({ label: "Extended loan term", impact: 4, detail: `${termMonths} months` })
  }

  score = Math.min(score, 100)

  if (factors.length === 0) {
    factors.push({
      label: "No major scenario flags",
      impact: 0,
      detail: "Inputs remain inside the lower-risk demo ranges.",
    })
  }

  return {
    score,
    band: bandForScore(score),
    factors,
  }
}
