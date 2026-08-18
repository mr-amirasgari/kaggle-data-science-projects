import { describe, expect, it } from "vitest"
import { predictRevenue } from "@/lib/model"

describe("Ridge revenue estimator", () => {
  it("matches the exported Python model for Store 1-like inputs", () => {
    const prediction = predictRevenue({ area: 2100, checkout: 6, property: "Owned", type: "Hyper", age: "New" })
    expect(prediction).toBeCloseTo(39605278.402995735, 3)
  })

  it("uses the training-data median when checkout is missing", () => {
    const prediction = predictRevenue({ area: 500, checkout: null, property: "Rental", type: "Express", age: "New" })
    expect(prediction).toBeCloseTo(14197826.164072637, 3)
  })

  it("returns a finite number for a valid scenario", () => {
    expect(Number.isFinite(predictRevenue({ area: 1000, checkout: 4, property: "Cooperate", type: "Extra", age: "Old" }))).toBe(true)
  })
})
