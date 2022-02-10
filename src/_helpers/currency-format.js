export default function currencyFormat(amount, currencyCode, minFractionDigits = 0, maxFractionDigits = 0) {
  if (!currencyCode) {
    throw new Error(`The 2nd argument must be a string currency code such as: "USD", "EUR"`);
  }
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  });
  return formatter.format(amount);
}
