import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"
import { hasResults, inputs } from "@/stores/calculator"

function MonthlyRepayments() {
  const $hasResults = useStore(hasResults)
  const data = useStore(inputs)
  const { amount, interestRate, term, type } = data
  const [{ monthly, total }, setState] = useState({ monthly: 0, total: 0 })

  const calculateMonthlyRepayments = () => {
    const monthlyInterestRate = interestRate / 12 / 100

    const monthly =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -term * 12))
    const total = monthly * term * 12

    return { monthly, total }
  }

  const calculateMonthlyInterests = () => {
    const monthly = amount * interestRate
    const total = monthly * term * 12

    return { monthly, total }
  }

  useEffect(() => {
    if (type === "repayment") setState(calculateMonthlyRepayments())
    else setState(calculateMonthlyInterests())
  }, [$hasResults])

  return (
    <>
      <div>
        <h3>Your monthly repayments</h3>
        <p>${monthly}</p>
      </div>
      <div>
        <h3>Total you'll repay over the term</h3>
        <p>${total}</p>
      </div>
    </>
  )
}

export default MonthlyRepayments
