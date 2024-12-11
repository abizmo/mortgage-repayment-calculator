import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"
import { hasResults, inputs } from "@/stores/calculator"
import styles from "@/components/monthly-repayments.module.css"

function MonthlyRepayments() {
  const $hasResults = useStore(hasResults)
  const { amount, interestRate, term, type } = useStore(inputs)
  const [{ monthly, total }, setState] = useState({ monthly: 0, total: 0 })

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  const calculateMonthlyRepayments = () => {
    const monthlyInterestRate = interestRate / 12 / 100

    const monthly =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -term * 12))
    const total = monthly * term * 12

    return { monthly, total }
  }

  const calculateMonthlyInterests = () => {
    const monthly = amount * (interestRate / 100 / 12)
    const total = monthly * term * 12

    return { monthly, total }
  }

  useEffect(() => {
    if (type === "repayment") setState(calculateMonthlyRepayments())
    else setState(calculateMonthlyInterests())
  }, [$hasResults])

  return (
    <div className={styles.resultsBox}>
      <div className={styles.mainResult}>
        <h3>Your monthly repayments</h3>
        <p className="fs-900 fw-bold text-accent">
          {currencyFormatter.format(monthly)}
        </p>
      </div>
      <div>
        <h3>Total you'll repay over the term</h3>
        <p className="fs-700 fw-bold">{currencyFormatter.format(total)}</p>
      </div>
    </div>
  )
}

export default MonthlyRepayments
