import { HTTPTransport } from '../core/HttpTransport';

export default class ChatApi {
  private api = new HTTPTransport('/chats');

  async get() {
    return this.api.GET('');
  }

  async create(data:any) {
    return this.api.POST('', { data });
  }

  async delete(data:any) {
    return this.api.DELETE('', { data });
  }

  async addUser(data:any) {
    return this.api.PUT('/users', { data });
  }

  async deleteUser(data:any) {
    return this.api.DELETE('/users', { data });
  }
}
