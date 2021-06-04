// merge an arbritrary number of Maps into a single Map
// keys from later Maps will overwrite previous ones if there are duplicates
export const mapMerge = <K, V>(...maps: Map<K, V>[]) => {
  return new Map(maps.map(m => [...m.entries()]).flat());
}

export const mapMergeToArray = <T>(...maps: Map<any, T>[]) => {
  return [...mapMerge(...maps).values()];
}