import { HTTPTransport } from '../core/HttpTransport';
import { SingupDTO } from '../dto/SingupDTO';
import { UserDTO } from '../dto/UserDTO';
import { LoginDTO } from '../dto/LoginDTO';

export default class AuthApi {
  private api = new HTTPTransport('/auth');

  async signup(data: SingupDTO) {
    return this.api.POST('/signup', {
      data: { ...data },
    });
  }

  async login(data: LoginDTO) {
    return this.api.POST('/signin', {
      data: { ...data },
    });
  }

  async getUser() {
    return this.api.GET<UserDTO>('/user');
  }

  async logout() {
    return this.api.POST('/logout');
  }
}
