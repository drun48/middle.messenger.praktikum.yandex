import UserApi from '../api/UserApi';
import Store from '../core/Store';
import { PasswordDTO } from '../dto/PasswordDTO';
import { UserAvatarDTO } from '../dto/UserAvatatDTO';
import { UserDTO } from '../dto/UserDTO';
import { checkStatus } from './checkStatus';

const userApi = new UserApi();

const deleteError = () => {
  Store.set('errorUpdateProfile', '');
};

const updateUser = async (data:UserDTO) => {
  const response = checkStatus(await userApi.updateUser(data));
  if (response.data) {
    Store.set('user', response.data);
  }
  if (response.error) {
    Store.set('errorUpdateProfile', `Не удалось обновить профиль: ${response.error.reason}`);
  }
};

const updatePassword = async (data:PasswordDTO) => {
  const response = checkStatus(await userApi.updatePassword(data));
  if (response.error) {
    Store.set('errorUpdateProfile', `Не удалось обновить пароль: ${response.error.reason}`);
  }
};

const updateAvatar = async (data:UserAvatarDTO) => {
  const response = checkStatus(await userApi.updateAvatar(data));
  if (response.data) {
    Store.set('user', response.data);
  }
  if (response.error) {
    Store.set('errorUpdateProfile', `Не удалось обновить фото: ${response.error.reason}`);
  }
};

export {
  deleteError,
  updateUser,
  updatePassword,
  updateAvatar,
};
