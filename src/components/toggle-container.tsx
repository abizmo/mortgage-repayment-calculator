import { useStore } from "@nanostores/react"
import { hasResults } from "@/stores/calculator"

interface ToggleContainerProps {
  trueComponent: React.ReactNode
  falseComponent: React.ReactNode
}

const ToggleContainer: React.FC<ToggleContainerProps> = ({
  trueComponent,
  falseComponent,
}) => {
  const $hasResults = useStore(hasResults)

  if ($hasResults) return trueComponent

  return falseComponent
}

export default ToggleContainer
