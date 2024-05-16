import { HTTPTransport } from '../core/HttpTransport';
import { PasswordDTO } from '../dto/PasswordDTO';
import { UserDTO } from '../dto/UserDTO';
import objectToFormData from '../utils/objectToFormData';

export default class UserApi {
  private api = new HTTPTransport('/user');

  updateUser(data:UserDTO) {
    return this.api.PUT<UserDTO>('/profile', { data: { ...data } });
  }

  updateAvatar(data:{avatar:File}) {
    return this.api.PUT<UserDTO>('/profile/avatar', { data: objectToFormData(data) });
  }

  updatePassword(data:PasswordDTO) {
    return this.api.PUT('/password', { data: { ...data } });
  }

  searchUser(data:{login:string}) {
    return this.api.POST<Array<UserDTO>>('/search', { data: { ...data } });
  }
}
