import { HTTPTransport } from '../core/HttpTransport';

export default class AuthApi {
  private authApi = new HTTPTransport('/auth', { 'content-type': 'application/json' });

  async signup(data: any) {
    return this.authApi.POST('/signup', {
      data,
    });
  }

  async login(data: any) {
    return this.authApi.POST('/signin', {
      data,
    });
  }

  async getUser() {
    return this.authApi.GET<{test:string}>('/user');
  }

  async logout() {
    return this.authApi.POST('/logout');
  }
}
