import UserApi from '../api/UserApi';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';

const userApi = new UserApi();

const deleteError = () => {
  Store.set('errorUpdateProfile', '');
};

const updateUser = async (data:any) => {
  const response = checkStatus(await userApi.updateUser(data));
  if (response.data) {
    Store.set('user', response.data);
  }
  if (response.error) {
    Store.set('errorUpdateProfile', `Не удалось обновить профиль: ${response.error.reason}`);
  }
};

const updatePassword = async (data:any) => {
  const response = checkStatus(await userApi.updatePassword(data));
  if (response.error) {
    Store.set('errorUpdateProfile', `Не удалось обновить пароль: ${response.error.reason}`);
  }
};

export {
  deleteError,
  updateUser,
  updatePassword,
};
