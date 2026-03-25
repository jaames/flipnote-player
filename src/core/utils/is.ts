export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;

export const isNull = (value: unknown): value is null => value === null;

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === undefined || value == null;

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNumberNaN = Number.isNaN;

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNumberNaN(value);

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export const isFunction = <T = Function>(value: unknown): value is T =>
  typeof value === 'function';

export const isArray = <T = any[]>(value: any): value is T =>
  Array.isArray(value);

export const isObject = <T = Record<string | number | symbol, unknown>>(
  value: unknown,
): value is T => typeof value === 'object' && value !== null && !isArray(value);

export const hasProperty = <K extends keyof O, O = any>(
  value: O,
  property: K,
): value is O & { [key in K]: unknown } => isObject(value) && property in value;

export const isPrimitive = (
  value: unknown,
): value is string | number | boolean =>
  value == null || (typeof value !== 'object' && typeof value !== 'function');

type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array;

export const isTypedArray = <T extends TypedArray>(
  value: unknown,
): value is T => {
  const TypedArray = Object.getPrototypeOf(Uint8Array);
  return value instanceof TypedArray;
};

export const isDate = (value: unknown): value is Date =>
  value instanceof Date && !isNaN(value.getTime());
