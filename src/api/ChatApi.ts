import { HTTPTransport } from '../core/HttpTransport';
import objectToFormData from '../utils/objectToFormData';

export default class ChatApi {
  private api = new HTTPTransport('/chats');

  async get() {
    return this.api.GET('');
  }

  async getToken(id:number) {
    return this.api.POST(`/token/${id}`);
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

  async updateAvatar(data:any) {
    return this.api.PUT('/avatar', { data: objectToFormData(data) });
  }

  async deleteUser(data:any) {
    return this.api.DELETE('/users', { data });
  }
}
