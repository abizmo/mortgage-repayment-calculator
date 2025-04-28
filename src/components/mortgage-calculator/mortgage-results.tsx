import formatToCurrency from "@/lib/formatToCurrency";

interface MortgageResultsProps {
  monthly: number;
  total: number;
}
function MortgageResults({ monthly, total }: MortgageResultsProps) {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Your results</h2>
      <p className="opacity-60 mb-6 sm:mb-10">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <div className="bg-black/40 p-4 sm:p-6 rounded-lg border-t-4 border-guide-primary">
        <p className="border-b border-white/30 pb-4 mb-4 sm:mb-6">
          <span className="opacity-60">Your monthly repayments</span>
          <span className="block font-bold text-guide-primary text-4xl sm:text-6xl">
            {formatToCurrency(monthly)}
          </span>
        </p>
        <p>
          <span className="opacity-60">Total you'll repay over the term</span>
          <span className="block font-bold text-2xl">
            {formatToCurrency(total)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default MortgageResults;
