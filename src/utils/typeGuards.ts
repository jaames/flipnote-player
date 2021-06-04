export const isString = (value: any): value is string => typeof(value) === 'string';

export const isNumber = (value: any): value is number => typeof(value) === 'number';

export const isObject = (value: any): value is Record<string, any> => typeof(value) === 'object' && value !== null;

export const isTypeOf = <T = any>(value: any, ...keys: (keyof T)[]): value is T => {
  for (const key of keys)
    if (!(key in value))
      return false;
  return true;
}