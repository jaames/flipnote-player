export function compareString(a: string, b: string) {
  return a.localeCompare(b);
}

export function compareDate(a: Date, b: Date) {
  return a.getSeconds() - b.getSeconds();
}