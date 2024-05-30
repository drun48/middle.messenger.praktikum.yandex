type Indexed = {
  [key in string]:unknown
}

function isIndexed(x: unknown): x is Indexed {
  return typeof x === 'object' && x !== null;
}

export function isEqual(a:Indexed|unknown, b: Indexed|unknown): boolean {
  if (!isIndexed(a) && !isIndexed(b)) {
    return a === b;
  }
  if (!isIndexed(a) || !isIndexed(b)) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysA) {
    const equal = isEqual(a[key], b[key]);
    if (!equal) return false;
  }

  return true;
}
