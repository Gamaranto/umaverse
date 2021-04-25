export function formatMilions(
  value: number,
  precision = 2,
  raw = false
): string | number {
  let postFix = "";
  let formattedValue = value;
  switch (true) {
    case value >= 10 ** 9: {
      postFix = "B";
      formattedValue = value / 10 ** 9;
      break;
    }
    case value >= 10 ** 6: {
      postFix = "M";
      formattedValue = value / 10 ** 6;
      break;
    }
    default: {
      break;
    }
  }
  const rounded =
    Math.floor(formattedValue * 10 ** precision) / 10 ** precision;
  return raw ? rounded : `${prettyFormatNumber(rounded)}${postFix}`;
}

const prettyFormatNumber = Intl.NumberFormat("en-US").format;

export function capitalize(s: string): string {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}