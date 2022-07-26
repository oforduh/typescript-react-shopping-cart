const CurrencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "NGN",
  style: "currency",
});

export const formatCurrency = (number: number) => [
  CurrencyFormatter.format(number),
];
