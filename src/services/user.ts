import UserApi from '../api/UserApi';
import constants from '../constants';
import Store from '../core/Store';
import { PasswordDTO } from '../dto/PasswordDTO';
import photoUser from '../assets/photoUser.png';
import { UserDTO } from '../dto/UserDTO';
import { checkStatus } from './checkStatus';
import { MethodFile, MethodUserDTO } from '../types/MethodService';

const userApi = new UserApi();

const deleteError = () => {
  Store.set('errorUpdateProfile', '');
};

const getUser = () => {
  const { user } = Store.getState();
  return user ? user as UserDTO : null;
};

const formatAvatar:MethodUserDTO = (user:UserDTO) => {
  // eslint-disable-next-line no-param-reassign
  user.avatar = user.avatar ? constants.GET_PHOTO + user.avatar : photoUser;
  return user;
};

const updateUser:MethodUserDTO = async (data) => {
  try {
    const response = checkStatus(await userApi.updateUser(data));
    if (response.data) {
      const user = formatAvatar(response.data);
      Store.set('user', user);
    }
    if (response.error) {
      Store.set('errorUpdateProfile', `Не удалось обновить профиль: ${response.error.reason}`);
    }
  } catch (e) {
    Store.set('errorUpdateProfile', 'Не удалось обновить профиль');
  }
};

const updatePassword = async (data:PasswordDTO) => {
  try {
    const response = checkStatus(await userApi.updatePassword(data));
    if (response.error) {
      Store.set('errorUpdateProfile', `Не удалось обновить пароль: ${response.error.reason}`);
    }
  } catch (e) {
    Store.set('errorUpdateProfile', 'Не удалось обновить пароль');
  }
};

const updateAvatar:MethodFile = async (avatar) => {
  try {
    const response = checkStatus(await userApi.updateAvatar({ avatar }));
    if (response.data) {
      const user = formatAvatar(response.data);
      Store.set('user', user);
    }
    if (response.error) {
      Store.set('errorUpdateProfile', `Не удалось обновить фото: ${response.error.reason}`);
    }
  } catch (e) {
    Store.set('errorUpdateProfile', 'Не удалось обновить фото');
  }
};

export {
  deleteError,
  updateUser,
  updatePassword,
  updateAvatar,
  getUser,
};
