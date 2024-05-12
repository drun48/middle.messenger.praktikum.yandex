import { HTTPTransport } from '../core/HttpTransport';

export default class ChatApi {
  private api = new HTTPTransport('/chats');

  async get() {
    return this.api.GET('');
  }

  async create(data:any) {
    return this.api.POST('', { data });
  }
}
