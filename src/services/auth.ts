import AuthApi from '../api/AuthApi';
import Router from '../core/Router';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';

const authApi = new AuthApi();

const login = async (data:any) => {
  const response = checkStatus(await authApi.login(data));
  if (response.data) {
    Store.set('auth', true);
    Store.set('loginError', '');

    Router.go('/messenger');
  }
  if (response.error) {
    Store.set('loginError', response.error.reason);
  }
};

const getUser = async () => {
  const response = await authApi.getUser();
  if (response.data) {
    Store.set('auth', true);
    Store.set('user', response.data);
  }
  if (response.error) {
    Store.set('auth', false);
    Store.set('user', null);
  }
};

const signup = async (data:any) => {
  const response = await authApi.signup(data);
  if (response.data) {
    Router.go('/');
  }
  if (response.error) {
    Store.set('signinError', response.error.reason);
  }
};

const logout = async () => {
  const response = checkStatus(await authApi.logout());
  if (!response.error) {
    Store.set('auth', false);
    Router.go('/');
  }
};

export {
  getUser,
  login,
  signup,
  logout,
};
