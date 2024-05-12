import ChatApi from '../api/ChatApi';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';
import avatar from '../assets/photoUser.png';

const chatApi = new ChatApi();

// eslint-disable-next-line no-shadow
enum ErrorsChats {
  errorCreateChat = 'errorCreateChat',
  errorDeleteChat = 'errorDeleteChat'
}

async function getChats() {
  const responce = checkStatus(await chatApi.get());
  if (responce.data) {
    const list = (responce.data as Array<unknown>).map((item:any) => ({
      id: item.id,
      // eslint-disable-next-line no-nested-ternary
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
    Store.set(ErrorsChats.errorCreateChat, `Ошибка создание чата: ${responce.error.reason})`);
    return false;
  }
  getChats();
  return true;
}

async function deleteChact(data:any) {
  const responce = checkStatus(await chatApi.delete(data));
  if (responce.error) {
    Store.set(ErrorsChats.errorDeleteChat, `Ошибка удаление чата: ${responce.error.reason}`);
    return false;
  }
  getChats();
  return true;
}

function clearError(error:ErrorsChats) {
  Store.set(error, '');
}

export {
  ErrorsChats,
  clearError,
  createChat,
  getChats,
  deleteChact,
};
