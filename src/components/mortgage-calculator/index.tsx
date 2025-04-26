import { useState } from "react";

import MortgageForm, { Result } from "./components/mortgage-form";
import MortgageNoResults from "./mortgage-no-results";
import MortgageResults from "./mortgage-results";

function MortgageCalculator() {
  const [hasResults, setHasResults] = useState(false);
  const [monthly, setMonthly] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCalculate = ({ monthly, total }: Result) => {
    setMonthly(monthly);
    setTotal(total);
    setHasResults(true);
  };

  const handleReset = () => {
    setMonthly(0);
    setTotal(0);
    setHasResults(false);
  };

  return (
    <div>
      <MortgageForm onCalculate={handleCalculate} onReset={handleReset} />
      {hasResults ? (
        <MortgageResults monthly={monthly} total={total} />
      ) : (
        <MortgageNoResults />
      )}
    </div>
  );
}

export default MortgageCalculator;
