import { atom, map } from "nanostores"

export type MortgageTypes = "repayment" | "interest-only"

export interface Results {
  monthly: number
  total: number
}

export interface Inputs {
  amount: number
  interestRate: number
  term: number
  type: MortgageTypes
}

const initialState: Inputs = {
  amount: 0,
  interestRate: 0,
  term: 0,
  type: "repayment",
}

export const inputs = map<Inputs>(initialState)

export const hasResults = atom<number>(0)

export const reset = () => {
  inputs.set(initialState)
  hasResults.set(0)
}

export interface Input {
  input: keyof Inputs
  value: number | MortgageTypes
}

export function isValidValue(value: string): value is MortgageTypes {
  return value === "repayment" || value === "interest-only"
}

export const changeInput = ({ input, value }: Input) => {
  inputs.setKey(input, value)
}
