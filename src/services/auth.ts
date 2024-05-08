import AuthApi from '../api/AuthApi';
import Router from '../core/Router';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';

const authApi = new AuthApi();

const login = async (data:any) => {
  const response = checkStatus(await authApi.login(data));
  if (response.data) {
    Store.set('auth', true);
    Router.go('/messenger');
  }
};

const getUser = async () => {
  const response = checkStatus(await authApi.getUser());
  if (response.data) {
    Store.set('auth', true);
  }
};

const signup = async (data:any) => {
  const response = await authApi.signup(data);
  if (response.data) {
    Router.go('/');
  }
};

const logout = async () => {
  const response = checkStatus(await authApi.logout());
  if (!response.error) {
    Router.go('/');
  }
};

export {
  getUser,
  login,
  signup,
  logout,
};
