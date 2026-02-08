export default function currencyConverter(
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    style?: "currency" | "decimal" | "percent" | "unit";
  } = {}
) {
  const { locale = "en-MY", currency = "MYR", style = "currency" } = options;

  return new Intl.NumberFormat(locale, {
    currency,
    style,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/\s/g, "");
}
