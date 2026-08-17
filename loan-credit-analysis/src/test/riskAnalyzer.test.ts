import { describe, expect, it } from "vitest"
import { analyzeCreditRisk } from "@/lib/riskAnalyzer"

describe("analyzeCreditRisk", () => {
  it("returns low risk for a conservative scenario", () => {
    const result = analyzeCreditRisk({
      annualIncome: 120000,
      loanAmount: 20000,
      termMonths: 24,
      dti: 12,
      creditHistory: "good",
      employmentYears: 8,
    })

    expect(result.band).toBe("Low")
    expect(result.score).toBe(0)
  })

  it("returns high risk for a stressed scenario", () => {
    const result = analyzeCreditRisk({
      annualIncome: 40000,
      loanAmount: 35000,
      termMonths: 72,
      dti: 55,
      creditHistory: "poor",
      employmentYears: 0.5,
    })

    expect(result.band).toBe("High")
    expect(result.score).toBe(100)
  })

  it("rejects invalid income", () => {
    expect(() =>
      analyzeCreditRisk({
        annualIncome: 0,
        loanAmount: 10000,
        termMonths: 24,
        dti: 20,
        creditHistory: "good",
        employmentYears: 3,
      }),
    ).toThrow("Annual income must be greater than 0.")
  })
})
