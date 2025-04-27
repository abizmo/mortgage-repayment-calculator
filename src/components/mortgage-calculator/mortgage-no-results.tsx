function MortgageNoResults() {
  return (
    <div className="text-center grid justify-items-center gap-4">
      <img src="/images/illustration-empty.svg" alt="Calculator" />
      <h2 className="font-bold text-2xl">Results show here</h2>
      <p className="opacity-60 text-balance">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

export default MortgageNoResults;
