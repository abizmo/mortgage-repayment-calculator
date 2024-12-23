import { changeInput, errors, type Inputs } from "@/stores/calculator"

import styles from "@/styles/input.module.css"
import { useStore } from "@nanostores/react"
import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: keyof Inputs
  decorator?: string
  reverse?: boolean
}

function Input({
  decorator,
  reverse = false,
  label,
  id,
  className: classess,
  ...props
}: InputProps) {
  const { [id]: error } = useStore(errors)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget

    if (!isNaN(+value)) {
      changeInput({ input: id, value: +value })
    }
  }

  return (
    <label className={[classess, styles.label].join(" ")}>
      {label}
      <div
        className={[
          styles.container,
          reverse && styles.reverse,
          error && styles.error,
        ].join(" ")}
      >
        <span className={styles.decorator}>{decorator}</span>
        <input
          className={styles.input}
          type="text"
          id={id}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error && <span className={styles.message}>This field is required</span>}
    </label>
  )
}

export default Input
