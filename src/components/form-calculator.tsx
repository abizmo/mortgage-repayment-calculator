import { hasResults, reset } from "@/stores/calculator"

interface FormElements extends HTMLFormControlsCollection {
  amount: HTMLInputElement
  term: HTMLInputElement
  interestRate: HTMLInputElement
  type: HTMLSelectElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface FormEvent extends React.FormEvent<FormElement> { }

function FormCalculator({ children }: React.PropsWithChildren) {
  const handleSubmit = (evt: React.PropsWithChildren<FormEvent>) => {
    evt.preventDefault()

    hasResults.set(hasResults.value + 1)
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
