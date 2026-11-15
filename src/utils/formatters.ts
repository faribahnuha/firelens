const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatInteger(value: number): string {
  return integerFormatter.format(Math.round(value));
}

export function formatPeriod(period: string): string {
  const [year, month] = period.split("-").map(Number);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatSignedDays(value: number): string {
  if (value === 0) return "On time";
  return `${Math.abs(value)} days ${value < 0 ? "early" : "late"}`;
}

export function ordinal(value: number): string {
  const rounded = Math.round(value);
  const mod100 = rounded % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${rounded}th`;

  switch (rounded % 10) {
    case 1:
      return `${rounded}st`;
    case 2:
      return `${rounded}nd`;
    case 3:
      return `${rounded}rd`;
    default:
      return `${rounded}th`;
  }
}

