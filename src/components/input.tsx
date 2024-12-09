import { changeInput, type Inputs } from "@/stores/calculator"

interface InputProps {
  label: string
  id: keyof Inputs
}

function Input({ label, id }: InputProps) {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget

    if (!isNaN(+value)) {
      changeInput({ input: id, value: +value })
    }
  }

  return (
    <label>
      {label}
      <input type="text" id={id} onChange={handleChange} />
    </label>
  )
}

export default Input
