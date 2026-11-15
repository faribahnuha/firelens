const cividisStops = [
  "#00204c",
  "#31446b",
  "#666970",
  "#948e77",
  "#c7b866",
  "#fee838",
] as const;

function hexToRgb(hex: string): [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${[red, green, blue]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function cividisColor(value: number, min: number, max: number): string {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) {
    return cividisStops[0];
  }

  const normalized = max === min ? 0.5 : (value - min) / (max - min);
  const bounded = Math.max(0, Math.min(1, normalized));
  const position = bounded * (cividisStops.length - 1);
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.min(cividisStops.length - 1, lowerIndex + 1);
  const fraction = position - lowerIndex;
  const lower = hexToRgb(cividisStops[lowerIndex]);
  const upper = hexToRgb(cividisStops[upperIndex]);

  return rgbToHex(
    lower[0] + (upper[0] - lower[0]) * fraction,
    lower[1] + (upper[1] - lower[1]) * fraction,
    lower[2] + (upper[2] - lower[2]) * fraction,
  );
}

export function readableTextColor(background: string): "#06151e" | "#f4f7f6" {
  const [red, green, blue] = hexToRgb(background);
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance > 0.55 ? "#06151e" : "#f4f7f6";
}

