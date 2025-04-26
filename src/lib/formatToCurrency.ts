const formatToCurrency = (value: number) => {
  return value.toLocaleString("en-UK", {
    style: "currency",
    currency: "GBP",
  });
};

export default formatToCurrency;
