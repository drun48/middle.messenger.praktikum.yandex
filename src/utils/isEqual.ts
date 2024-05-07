import { Indexed } from '../core/Store';

export function isEqual(a:Indexed, b: Indexed): boolean {
  if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  } if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysA) {
    const equal = isEqual(a[key] as Indexed, b[key] as Indexed);
    if (!equal) return false;
  }

  return true;
}
