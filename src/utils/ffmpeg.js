export function buildArgumentList(args) {
  function flatten(arr) {
    return arr.reduce((result, item) => {
      if (Array.isArray(item)) item = flatten(item);
      return result.concat(item);
    }, []);
  }
  return flatten(args).filter(item => item ? true : false);
}

export class FilterGraph {
  constructor() {
    this.graph = [];
  }

  getGraph() {
    return this.graph.map(({ input, filter, output }, index) => {
      const inputList = Array.isArray(input) ? input : [input];
      const isLastItem = index === this.graph.length - 1;
      return `${ inputList.map(i => `[${ i }]`).join('') }${ filter }${ isLastItem ? '' : `[${ output }]` }`;
    }).join(';');
  }

  push(item) {
    this.graph.push(item);
    return this;
  }

  delay(input, delay, output) {
    return this.push({
      input,
      filter: `adelay=${ delay > 0 ? delay : 1 }`,
      output
    });
  }

  mix(input, output) {
    return this.push({
      input: input,
      filter: `amix=inputs=${ input.length }`,
      output
    });
  }

  volume(input, volume, output) {
    return this.push({
      input,
      filter: `volume=${ volume}`,
      output
    });
  }

  equalize(input, gainEntries, output) {
    const gainEntryList = gainEntries.map(entry => `entry(${ entry[0] }\\,${ entry[1] })`);
    return this.push({
      input,
      filter: `firequalizer=gain_entry='${ gainEntryList.join(';') }'`,
      output
    });
  }
}