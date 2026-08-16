import { describe, expect, it } from "vitest"
import { predictDrug } from "@/lib/predictDrug"

describe("predictDrug", () => {
  it("returns drugY for Na/K above the root threshold", () => {
    expect(predictDrug({ age: 32, sex: "F", bp: "HIGH", cholesterol: "NORMAL", naToK: 25.974 }).drug).toBe("drugY")
  })

  it("returns drugA for younger HIGH-BP patients below the Na/K threshold", () => {
    expect(predictDrug({ age: 43, sex: "M", bp: "HIGH", cholesterol: "HIGH", naToK: 13.972 }).drug).toBe("drugA")
  })

  it("returns drugB for older HIGH-BP patients below the Na/K threshold", () => {
    expect(predictDrug({ age: 74, sex: "M", bp: "HIGH", cholesterol: "HIGH", naToK: 9.567 }).drug).toBe("drugB")
  })

  it("returns drugC for LOW-BP high-cholesterol patients below the Na/K threshold", () => {
    expect(predictDrug({ age: 47, sex: "M", bp: "LOW", cholesterol: "HIGH", naToK: 10.114 }).drug).toBe("drugC")
  })

  it("returns drugX for NORMAL-BP patients below the Na/K threshold", () => {
    expect(predictDrug({ age: 28, sex: "F", bp: "NORMAL", cholesterol: "HIGH", naToK: 7.798 }).drug).toBe("drugX")
  })
})
