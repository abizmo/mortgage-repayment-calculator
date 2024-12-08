import { changeInput, type MortgageTypes } from "@/stores/calculator"

export interface SelectOption<T> {
  label: string
  value: T
}

export interface SelectProps<T> {
  label: string
  options: SelectOption<T>[]
}

function Select({ label, options }: SelectProps<MortgageTypes>) {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    changeInput({
      input: "type",
      value: evt.currentTarget.value as MortgageTypes,
    })
  }

  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map(({ label, value }) => (
        <label key={value}>
          <input
            type="radio"
            name="type"
            value={value as string}
            onChange={handleChange}
          />
          {label}
        </label>
      ))}
    </fieldset>
  )
}

export default Select
