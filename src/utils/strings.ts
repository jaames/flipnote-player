/*
 * quick and simple cyrb53 string hash
 */
export const stringHash = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
}

/*
 * returns a number indicating whether string A comes before string B (negative) or after (positive), in alphabetical order
 */
export const stringCompare = (a: string, b: string) => a.localeCompare(b);

/*
 * Compile a callable string format template from a string literal
 * Usage:
 *  const sentance = stringCompileTemplate`this is a ${'thing'}`;
 *  const formatted = sentance({ thing: 'pen' });
 * 
 * Or:
 *  const sentance = stringCompileTemplate`this is a ${0}, it is {1}`;
 *  const formatted = sentance(['pen', 'cool']);
 */
export const stringCompileTemplate = (strings: TemplateStringsArray, ...expr: (string | number)[]) => {
  return (replacements: (Record<string, any> | any[])) => {
    // convert ${'whatever'} instances to array of values
    const values = Array.isArray(replacements)?
      expr.map(key => replacements[key as number] ?? key):
      expr.map(key => replacements[key] ?? key);
    // rebuild string with replaced values
    return strings.reduce((result, part, i) => result + part + (values[i] ?? ''), '');
  }
}