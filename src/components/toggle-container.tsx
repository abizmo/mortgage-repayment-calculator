import { useStore } from "@nanostores/react"
import { hasResults } from "@/stores/calculator"

interface ToggleContainerProps {
  true: React.ReactNode
  false: React.ReactNode
}

function ToggleContainer({
  true: ActiveComponent,
  false: FalseComponent,
}: ToggleContainerProps) {
  const $hasResults = useStore(hasResults)

  if ($hasResults) return ActiveComponent

  return FalseComponent
}

export default ToggleContainer
