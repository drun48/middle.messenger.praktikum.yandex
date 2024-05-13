import AuthApi from '../api/AuthApi';
import Router from '../core/Router';
import Store from '../core/Store';
import avatar from '../assets/photoUser.png';
import constants from '../constants';
import { SingupDTO } from '../dto/SingupDTO';
import { LoginDTO } from '../dto/loginDTO';
import { checkStatus } from './checkStatus';

const authApi = new AuthApi();

const login = async (data:LoginDTO) => {
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
    const user = response.data;
    user.avatar = user.avatar ? constants.GET_PHOTO + user.avatar : avatar;
    Store.set('auth', true);
    Store.set('user', user);
  }
  if (response.error) {
    Store.set('auth', false);
    Store.set('user', null);
  }
};

const signup = async (data:SingupDTO) => {
  const response = await authApi.signup(data);
  if (response.data) {
    await getUser();
    Router.go('/messenger');
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
