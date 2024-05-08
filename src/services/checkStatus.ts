import { Responce } from '../core/HttpTransport';
import Router from '../core/Router';
import Store from '../core/Store';

export function checkStatus<T>(response:Responce<T>):Responce<T> {
  if (response.status === 401) {
    Store.set('auth', false);
    Router.go('/');
  }
  if (response.status >= 500) {
    // Router.go('/');
  }
  return response;
}
