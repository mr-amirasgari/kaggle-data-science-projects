export type BloodPressure = "HIGH" | "NORMAL" | "LOW"
export type Cholesterol = "HIGH" | "NORMAL"
export type Sex = "F" | "M"
export type DrugClass = "drugA" | "drugB" | "drugC" | "drugX" | "drugY"

export type PatientInput = {
  age: number
  sex: Sex
  bp: BloodPressure
  cholesterol: Cholesterol
  naToK: number
}

export type Prediction = {
  drug: DrugClass
  confidenceLabel: "High"
  path: string[]
}

// Browser-side representation of the compact decision tree learned on Drug200.
export function predictDrug(input: PatientInput): Prediction {
  if (!Number.isFinite(input.age) || input.age < 1 || input.age > 120) {
    throw new Error("Age must be between 1 and 120.")
  }
  if (!Number.isFinite(input.naToK) || input.naToK <= 0 || input.naToK > 100) {
    throw new Error("Na/K must be greater than 0 and at most 100.")
  }

  if (input.naToK > 14.829) {
    return {
      drug: "drugY",
      confidenceLabel: "High",
      path: [`Na/K ${input.naToK.toFixed(2)} > 14.829`, "→ drugY"],
    }
  }

  if (input.bp === "HIGH") {
    if (input.age <= 50.5) {
      return {
        drug: "drugA",
        confidenceLabel: "High",
        path: ["Na/K ≤ 14.829", "BP = HIGH", `Age ${input.age} ≤ 50.5`, "→ drugA"],
      }
    }
    return {
      drug: "drugB",
      confidenceLabel: "High",
      path: ["Na/K ≤ 14.829", "BP = HIGH", `Age ${input.age} > 50.5`, "→ drugB"],
    }
  }

  if (input.bp === "LOW" && input.cholesterol === "HIGH") {
    return {
      drug: "drugC",
      confidenceLabel: "High",
      path: ["Na/K ≤ 14.829", "BP = LOW", "Cholesterol = HIGH", "→ drugC"],
    }
  }

  return {
    drug: "drugX",
    confidenceLabel: "High",
    path: ["Na/K ≤ 14.829", input.bp === "NORMAL" ? "BP = NORMAL" : "LOW BP + normal cholesterol", "→ drugX"],
  }
}
