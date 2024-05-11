import { HTTPTransport } from '../core/HttpTransport';
import { PasswordDTO } from '../dto/PasswordDTO';
import { UserAvatarDTO } from '../dto/UserAvatatDTO';
import { UserDTO } from '../dto/UserDTO';
import objectToFormData from '../utils/objectToFormData';

export default class UserApi {
  private api = new HTTPTransport('/user');

  updateUser(data:UserDTO) {
    return this.api.PUT<UserDTO>('/profile', { data: { ...data } });
  }

  updateAvatar(data:UserAvatarDTO) {
    return this.api.PUT<UserDTO>('/profile/avatar', { data: objectToFormData(data) });
  }

  updatePassword(data:PasswordDTO) {
    return this.api.PUT('/password', { data: { ...data } });
  }
}
