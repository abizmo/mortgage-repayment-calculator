import formatToCurrency from "@/lib/formatToCurrency";

interface MortgageResultsProps {
  monthly: number;
  total: number;
}
function MortgageResults({ monthly, total }: MortgageResultsProps) {
  return (
    <div>
      <h2>Your results</h2>
      <p>
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <div>
        <p>
          Your monthly repayments <span>{formatToCurrency(monthly)}</span>
        </p>
        <p>
          Total you'll repay over the term{" "}
          <span>{formatToCurrency(total)}</span>
        </p>
      </div>
    </div>
  );
}

export default MortgageResults;
