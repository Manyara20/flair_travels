const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUSD(value: number) {
  return usd.format(value);
}

export function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}
