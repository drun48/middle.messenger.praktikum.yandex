import ChatApi from '../api/ChatApi';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';
import avatar from '../assets/photoUser.png';

const chatApi = new ChatApi();

async function getChats() {
  const responce = checkStatus(await chatApi.get());
  if (responce.data) {
    const list = (responce.data as Array<unknown>).map((item:any) => ({
      id: item.id,
      avatar: item.avatar ? item.avatar : item.last_message?.user?.avatar ? item.last_message.user.avatar : avatar,
      title: item.title,
      unread_count: item.unread_count,
      message: item.content,
      time: item.time,
    }));
    Store.set('listChat', list);
  }
  if (responce.error) {
    Store.set('listChat', []);
  }
}

async function createChat(data:any) {
  const responce = checkStatus(await chatApi.create(data));
  if (responce.error) {
    Store.set('errorCreateChat', responce.error.reason);
    return false;
  }
  getChats();
  return true;
}

export {
  createChat,
  getChats,
};
