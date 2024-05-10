type StringIndexed = Record<string, unknown>;

function isObject(x: unknown): x is StringIndexed {
  return typeof x === 'object' && x !== null;
}

function keyForma(key:string, keyDeep:string):string {
  if (!key) {
    return keyDeep;
  }
  return `${key}[${keyDeep}]`;
}

function queryStringify(data: StringIndexed): string | never {
  if (!isObject(data)) throw new Error('input must be an object');
  function getValue(key: string, obj: StringIndexed) {
    let str = '';
    if (isObject(obj)) {
      if (Array.isArray(obj)) {
        obj.forEach((value, keyDeep) => {
          str += getValue(keyForma(key, keyDeep.toString()), value);
        });
      } else {
        Object.entries(obj).forEach(([keyDeep, value]) => {
          str += getValue(keyForma(key, keyDeep), value as StringIndexed);
        });
      }
    } else {
      str = `${key}=${obj}&`;
    }
    return str;
  }

  // eslint-disable-next-line no-useless-escape
  return getValue('', data).replace(/\&+$/, '');
}

export default queryStringify;
