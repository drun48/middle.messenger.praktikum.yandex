import constants from '../constants';
import merge from '../utils/merge';

// eslint-disable-next-line no-shadow
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Header = Record<string, string>

type Options = {
  data?: Record<string, unknown>;
  headers?: Header;
  timeout?: number;
  method: METHODS;
};

type HTTPMethod = (url: string, options?: Omit<Options, 'method'>) => Promise<unknown>

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

export class HTTPTransport {
  private url:string;

  private header:Header;

  constructor(url:string, header:Header = {}) {
    this.url = constants.HOST + url;
    this.header = header;
  }

  GET:HTTPMethod = (url, options) => {
    let str = url;
    if (options?.data) {
      str += queryStringify(options.data);
    }
    return this.request(
      str,
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  };

  // eslint-disable-next-line max-len
  POST:HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  // eslint-disable-next-line max-len
  PUT:HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  // eslint-disable-next-line max-len
  DELETE:HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  // eslint-disable-next-line class-methods-use-this
  request = (url: string, options: Options, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, this.url + url);
      xhr.withCredentials = true;
      const headersMerge = merge(this.header, headers ?? {});
      Object.entries(headersMerge).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        console.log(xhr, 'dfsfdsfdsfsfd');
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
