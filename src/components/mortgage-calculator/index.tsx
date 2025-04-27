import { useState } from "react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import MortgageForm, { Result } from "./components/mortgage-form";
import MortgageNoResults from "./mortgage-no-results";
import MortgageResults from "./mortgage-results";

interface MortgageCalculatorProps {
  className?: string;
}

function MortgageCalculator({ className }: MortgageCalculatorProps) {
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
    <Card className={className}>
      <CardHeader>
        <MortgageForm onCalculate={handleCalculate} onReset={handleReset} />
      </CardHeader>
      <CardFooter className="bg-guide-900 lg:rounded-bl-[5rem]">
        {hasResults ? (
          <MortgageResults monthly={monthly} total={total} />
        ) : (
          <MortgageNoResults />
        )}
      </CardFooter>
    </Card>
  );
}

export default MortgageCalculator;
