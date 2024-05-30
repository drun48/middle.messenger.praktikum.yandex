import { HTTPTransport } from '../core/HttpTransport';
import { ChatDTO } from '../dto/ChatDTO';
import { DeleteChatDTO } from '../dto/DeleteChatDTO';
import { UpdateUserChatDTO } from '../dto/UpdateUserChatDTO';
import objectToFormData from '../utils/objectToFormData';

export default class ChatApi {
  private api = new HTTPTransport('/chats');

  async get() {
    return this.api.GET<Array<ChatDTO>>('');
  }

  async getToken(id:number) {
    return this.api.POST<{token:string}>(`/token/${id}`);
  }

  async create(data:{title:string}) {
    return this.api.POST<{id:number}>('', { data });
  }

  async delete(data:{chatId:number}) {
    return this.api.DELETE<DeleteChatDTO>('', { data });
  }

  async addUser(data:UpdateUserChatDTO) {
    return this.api.PUT<string>('/users', { data: { ...data } });
  }

  async updateAvatar(data:{chatId:number, avatar:File}) {
    return this.api.PUT<Pick<ChatDTO, 'id' | 'avatar' | 'title' | 'created_by'>>('/avatar', { data: objectToFormData(data) });
  }

  async deleteUser(data:UpdateUserChatDTO) {
    return this.api.DELETE('/users', { data: { ...data } });
  }

  async getNewMessageCount(id:number) {
    return this.api.GET<{unread_count:number}>(`/new/${id}`);
  }
}
