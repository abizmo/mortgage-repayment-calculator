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

export interface ErrorInputs {
  amount: "This field is required" | "" | undefined
  interestRate: "This field is required" | "" | undefined
  term: "This field is required" | "" | undefined
  type: "This field is required" | "" | undefined
}

const initialState: Inputs = {
  amount: 0,
  interestRate: 0,
  term: 0,
  type: "repayment",
}

const initialErrorState: ErrorInputs = {
  amount: undefined,
  interestRate: undefined,
  term: undefined,
  type: undefined,
}

export const inputs = map<Inputs>(initialState)

export const hasResults = atom<number>(0)

export const errors = map<ErrorInputs>(initialErrorState)

export const reset = () => {
  inputs.set(initialState)
  hasResults.set(0)
}

export interface Input {
  input: keyof Inputs
  value: number | MortgageTypes
}

export const changeInput = ({ input, value }: Input) => {
  inputs.setKey(input, value)
}

export const addError = (input: keyof ErrorInputs) => {
  errors.setKey(input, "This field is required")
}

export const removeError = (input: keyof ErrorInputs) => {
  errors.setKey(input, "")
}
