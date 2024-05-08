import { HTTPTransport } from '../core/HttpTransport';

export default class UserApi {
  private api = new HTTPTransport('/user', { 'content-type': 'application/json' });

  updateUser(data:any) {
    return this.api.PUT('/profile', { data });
  }

  updateAvatat(data:any) {
    return this.api.PUT('/profile/avatar', { data });
  }

  updatePassword(data:any) {
    return this.api.PUT('/password', { data });
  }
}
