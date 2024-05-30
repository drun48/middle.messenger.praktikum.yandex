type Indexed = Record<string, unknown>

function isObject(x: unknown): x is Indexed {
  return typeof x === 'object' && x !== null && !(x instanceof File);
}

function keyForma(key:string, keyDeep:string):string {
  if (!key) {
    return keyDeep;
  }
  return `${key}[${keyDeep}]`;
}

function objectToFormData<T>(data:T):FormData {
  const form = new FormData();
  if (!isObject(data)) throw new Error('input must be an object');
  function getValue(key: string, obj: Indexed) {
    if (isObject(obj)) {
      if (Array.isArray(obj)) {
        obj.forEach((value, keyDeep) => {
          getValue(keyForma(key, keyDeep.toString()), value);
        });
      } else {
        Object.entries(obj).forEach(([keyDeep, value]) => {
          getValue(keyForma(key, keyDeep), value as Indexed);
        });
      }
    } else {
      form.append(key, obj);
    }
  }
  getValue('', data);
  return form;
}

export default objectToFormData;
