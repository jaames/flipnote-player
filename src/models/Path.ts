export interface Path {
  full: string;
  name: string;
  base: string;
  ext: string;
  folder?: string;
  parentFolder?: string;
}

export function parsePath(full: string): Path {
  const parts = full.split('/');
  const name = parts[parts.length - 1];
  const lastDot = name.lastIndexOf('.');
  const base = name.slice(0, lastDot);
  const ext = name.slice(lastDot + 1);
  const folder = parts.length > 1 ? parts[parts.length - 2] : undefined;
  const parentFolder = parts.length > 2 ? parts[parts.length - 3] : undefined;
  return {
    full,
    name,
    base,
    ext,
    folder,
    parentFolder
  };
}