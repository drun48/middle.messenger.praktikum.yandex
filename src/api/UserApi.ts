import { HTTPTransport } from '../core/HttpTransport';
import objectToFormData from '../utils/objectToFormData';

export default class UserApi {
  private api = new HTTPTransport('/user');

  updateUser(data:any) {
    return this.api.PUT('/profile', { data });
  }

  updateAvatat(data:any) {
    return this.api.PUT('/profile/avatar', { data: objectToFormData(data) });
  }

  updatePassword(data:any) {
    return this.api.PUT('/password', { data });
  }
}
