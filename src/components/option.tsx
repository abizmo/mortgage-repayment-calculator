import styles from "@/styles/select.module.css"

function Option({
  value,
  label,
  isSelected,
  onChange,
}: {
  value: string
  label: string
  isSelected: boolean
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label
      key={value}
      className={[styles.container, isSelected && styles.selected].join(" ")}
    >
      <input
        className={styles.input}
        type="radio"
        name="type"
        value={value as string}
        onChange={onChange}
      />
      {label}
    </label>
  )
}

export default Option
