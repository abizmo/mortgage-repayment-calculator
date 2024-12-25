import { addError, hasResults, removeError, reset } from "@/stores/calculator"

interface FormElements extends HTMLFormControlsCollection {
  amount: HTMLInputElement
  term: HTMLInputElement
  interestRate: HTMLInputElement
  type: HTMLSelectElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface FormEvent extends React.FormEvent<FormElement> {}

// TODO: extract the validate function from the FormCalculator component
const validate = (elements: FormElements) => {
  const { amount, term, interestRate, type } = elements
  let isValid = true
  if (!amount.value) {
    addError("amount")
    isValid = false
  } else {
    removeError("amount")
  }

  if (!term.value) {
    addError("term")
    isValid = false
  } else {
    removeError("term")
  }

  if (!interestRate.value) {
    addError("interestRate")
    isValid = false
  } else {
    removeError("interestRate")
  }

  if (!type.value) {
    addError("type")
    isValid = false
  } else {
    removeError("type")
  }

  return isValid
}

function FormCalculator({ children }: React.PropsWithChildren) {
  const handleSubmit = (evt: React.PropsWithChildren<FormEvent>) => {
    evt.preventDefault()
    const { elements } = evt.currentTarget

    if (validate(elements)) hasResults.set(hasResults.value + 1)
  }

  const handleReset = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      {children}
    </form>
  )
}

export default FormCalculator
