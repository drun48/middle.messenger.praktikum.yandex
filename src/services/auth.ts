import AuthApi from '../api/AuthApi';
import Router from '../core/Router';
import Store from '../core/Store';
import avatar from '../assets/photoUser.png';
import constants from '../constants';
import { SingupDTO } from '../dto/SingupDTO';
import { LoginDTO } from '../dto/LoginDTO';
import { checkStatus } from './checkStatus';

const authApi = new AuthApi();

const getUser = async () => {
  try {
    const response = checkStatus(await authApi.getUser());
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
  } catch (e) {
    Store.set('auth', false);
    Store.set('user', null);
  }
};

const logout = async () => {
  try {
    const response = checkStatus(await authApi.logout());
    if (!response.error) {
      Store.set('auth', false);
      Router.go('/');
    }
  } catch (e) {
    console.log(e);
  }
};

const login = async (data:LoginDTO) => {
  try {
    const auth = Store.getState().auth as boolean;
    if (auth) {
      await logout();
    }
    const response = checkStatus(await authApi.login(data));
    if (response.data) {
      Store.set('auth', true);
      Store.set('loginError', '');
      getUser();
      Router.go('/messenger');
    }
    if (response.error) {
      Store.set('loginError', response.error.reason);
    }
  } catch (e) {
    Store.set('loginError', 'Во время входа произошла ошибка, попробуйте снова');
  }
};

const signup = async (data:SingupDTO) => {
  try {
    const auth = Store.getState().auth as boolean;
    if (auth) {
      await logout();
    }
    const response = await authApi.signup(data);
    if (response.data) {
      await getUser();
      Router.go('/messenger');
    }
    if (response.error) {
      Store.set('signinError', response.error.reason);
    }
  } catch (e) {
    Store.set('signinError', 'Во время регистрации произошла ошибка, попробуйте снова');
  }
};

export {
  getUser,
  login,
  signup,
  logout,
};
