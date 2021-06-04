export function assert(condition: boolean, errMsg: string = 'Assert failed'): asserts condition {
  if (!condition) {
    console.trace(errMsg);
    throw new Error(errMsg);
  }
}

export function assertExists<T>(value: T | null | undefined, name=''): T {
  if (value === undefined || value === null)
    throw new Error(`Missing object ${ name }`);
  return value;
}

export function assertRange(value: number, min: number, max: number, name=''): asserts value {
  assert(value >= min && value <= max, `Value ${name || value} should be between ${min} and ${max}`);
}