// returns a number indicating whether date A comes before date B (negative) or after (positive)
export const dateCompare = (a: Date, b: Date) => a.getSeconds() - b.getSeconds();