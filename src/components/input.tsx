import { changeInput, isValidValue, type Inputs } from "@/stores/calculator"

interface InputProps {
  label: string
  id: keyof Inputs
}

// TODO: decidir si se queda asi o lo dejo solo para valores numericos
function Input({ label, id }: InputProps) {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget

    if (!isNaN(+value)) {
      changeInput({ input: id, value: +value })
    } else if (isValidValue(value)) changeInput({ input: id, value })
  }

  return (
    <label>
      {label}
      <input type="text" id={id} onChange={handleChange} />
    </label>
  )
}

export default Input
