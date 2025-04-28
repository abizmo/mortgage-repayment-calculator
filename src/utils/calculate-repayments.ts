import { Calculator } from "@/types";

const calculateRepayments = ({
  amount,
  interestRate,
  term,
}: Omit<Calculator, "type">) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfPayments = term * 12;
  const x = (1 + monthlyInterestRate) ** numberOfPayments;
  const denominator = x - 1;
  const numerator = monthlyInterestRate * x;

  const monthly = (amount * numerator) / denominator;
  const total = monthly * numberOfPayments;

  return {
    monthly,
    total,
    interestsOnly: {
      monthly: monthly - amount / numberOfPayments,
      total: total - amount,
    },
  };
};

export default calculateRepayments;
