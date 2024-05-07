import AuthApi from '../api/AuthApi';
import Router from '../core/Router';
import Store from '../core/Store';

const authApi = new AuthApi();

const login = async (data:any) => {
  const answer = await authApi.login(data);
  if (!answer.error) {
    Router.go('/messenger');
  }
};

const getUser = async () => {
  const responseUser = await authApi.getUser();
  if (responseUser.status == 401) {
    Router.go('/');
    return;
  }
  Store.set('auth', true);
};

const signup = async (data:any) => {
  const answer = await authApi.create(data);
  console.log(answer);
};

const logout = async () => {
  const answer = await authApi.logout();
  if (!answer.error) {
    Router.go('/');
  }
};

export {
  getUser,
  login,
  signup,
  logout,
};
