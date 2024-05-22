export const isUndefined = (maybeObject: any): maybeObject is undefined | null =>
  typeof maybeObject === "undefined" || maybeObject === null;

export const formatNumber = (number: number): string => {
  if (number >= 1000000) {
    return Math.floor(number / 1000000) + "m";
  } else if (number >= 1000) {
    return Math.floor(number / 1000) + "k";
  } else {
    return number?.toString() ?? "0";
  }
};
