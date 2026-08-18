import model from "@/data/ridge-model.json"

export type RevenueInput = {
  area: number
  checkout: number | null
  property: string
  type: string
  age: string
}

export function predictRevenue(input: RevenueInput) {
  const numericValues = [input.area, input.checkout]
  const transformed: number[] = numericValues.map((value, index) => {
    const x = value == null || Number.isNaN(value) ? model.numeric.imputerMedian[index] : value
    return (x - model.numeric.mean[index]) / model.numeric.scale[index]
  })

  const categoricalValues = [input.property, input.type, input.age]
  categoricalValues.forEach((value, index) => {
    model.categorical.categories[index].forEach((category) => {
      transformed.push(value === category ? 1 : 0)
    })
  })

  return model.intercept + transformed.reduce((sum, value, index) => sum + value * model.coef[index], 0)
}

export const modelMetrics = model
