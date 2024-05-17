import constants from '../constants';
import { ApiError } from '../types/apiError';
import merge from '../utils/merge';
import queryStringify from '../utils/queryStringify';

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
  data?: Record<string, unknown> | FormData;
  headers?: Header;
  timeout?: number;
  method: METHODS;
};

export type Responce<T> = {
  status:number,
  data?:T,
  error?:ApiError
}

type HTTPMethod = <T=unknown>(url: string, options?: Omit<Options, 'method'>) => Promise<Responce<T>>

export class HTTPTransport {
  private url:string;

  private header:Header;

  constructor(url:string, header:Header = {}) {
    this.url = constants.HOST + url;
    this.header = header;
  }

  GET:HTTPMethod = (url, options) => {
    let str = url;
    if (options?.data && !(options.data instanceof FormData)) {
      str += queryStringify(options.data);
    }
    return this.request(
      str,
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  };

  POST:HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  PUT:HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  DELETE:HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  request = <T>(url: string, options: Options, timeout = 5000) => {
    const { method, data, headers = {} } = options;

    return new Promise<Responce<T>>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!(data instanceof FormData)) {
        headers['content-type'] = 'application/json';
      } else {
        headers['content-type'] = '';
      }

      xhr.open(method, this.url + url);
      xhr.withCredentials = true;
      const headersMerge = merge(this.header, headers ?? {});
      Object.entries(headersMerge).forEach(([key, value]) => {
        if (value) xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        const isJson = xhr.getResponseHeader('content-type')?.includes('application/json');
        const body = isJson ? JSON.parse(xhr.response) : xhr.response;
        const responce:Responce<T> = { status: xhr.status };
        if (xhr.status < 400) {
          responce.data = body;
        } else {
          responce.error = body;
        }
        resolve(responce);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (!(data instanceof FormData)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}
