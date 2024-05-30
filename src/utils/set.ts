import { Indexed } from '../core/Store';

function isIndexed(x: unknown): x is Indexed {
  return typeof x === 'object';
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') throw new Error('path must be string');
  if (!isIndexed(object)) return {};
  let curent = object;
  path.split('.').forEach((key, index, arr) => {
    if (index === arr.length - 1) {
      curent[key] = value;
    } else {
      if (!curent[key]) curent[key] = {};
      curent = curent[key] as Indexed;
    }
  });
  return object;
}

export default set;
