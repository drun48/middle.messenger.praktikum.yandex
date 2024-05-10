import { HTTPTransport } from '../core/HttpTransport';

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
    return this.api.GET<{test:string}>('/user');
  }

  async logout() {
    return this.api.POST('/logout');
  }
}
