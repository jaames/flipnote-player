export const setHasAny = <T = any>(set: Set<T>, values: Iterable<T>) => {
  for (let v of values)
    if (set.has(v)) return true;
  return false;
}

export const setHasAll = <T = any>(set: Set<T>, values: Iterable<T>) => {
  for (let v of values)
    if (!set.has(v)) return false;
  return true;
}
