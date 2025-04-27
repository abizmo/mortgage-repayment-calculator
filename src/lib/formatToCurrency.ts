const formatToCurrency = (value: number) => {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
};

export default formatToCurrency;
