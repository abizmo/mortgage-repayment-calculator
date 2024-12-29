import {
  changeInput,
  errors,
  inputs,
  type Inputs,
  type MortgageTypes,
} from "@/stores/calculator"
import { useStore } from "@nanostores/react"

import styles from "@/styles/select.module.css"
import Option from "./option"

export interface SelectOption<T> {
  label: string
  value: T
}

export interface SelectProps<T> {
  label: string
  id: keyof Inputs
  options: SelectOption<T>[]
}

function Select({ label, id, options }: SelectProps<MortgageTypes>) {
  const { [id]: error } = useStore(errors)
  const { [id]: select } = useStore(inputs)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    changeInput({
      input: "type",
      value: evt.currentTarget.value as MortgageTypes,
    })
  }

  return (
    <fieldset className={[styles.label, error && styles.error].join(" ")}>
      <legend>{label}</legend>
      {options.map(({ label, value }) => (
        <Option
          key={value}
          label={label}
          value={value}
          isSelected={select === value}
          onChange={handleChange}
        />
      ))}
      {error && <span className={styles.message}>This field is required</span>}
    </fieldset>
  )
}

export default Select
