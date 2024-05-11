import { HTTPTransport } from '../core/HttpTransport';
import { UserDTO } from '../dto/UserDTO';

export default class api {
  private api = new HTTPTransport('/auth');

  async signup(data: any) {
    return this.api.POST('/signup', {
      data,
    });
  }

  async login(data: any) {
    return this.api.POST('/signin', {
      data,
    });
  }

  async getUser() {
    return this.api.GET<UserDTO>('/user');
  }

  async logout() {
    return this.api.POST('/logout');
  }
}
