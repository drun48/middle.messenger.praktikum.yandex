import ChatApi from '../api/ChatApi';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';
import avatar from '../assets/photoUser.png';
import UserApi from '../api/UserApi';

const chatApi = new ChatApi();
const userApi = new UserApi();

// eslint-disable-next-line no-shadow
enum ErrorsChats {
  errorCreateChat = 'errorCreateChat',
  errorDeleteChat = 'errorDeleteChat'
}

function setActiveChat(id:number) {
  Store.set('activeChatId', id);
}

function getActiveChat():null|number {
  return Store.getState().activeChatId as null|number;
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

async function deleteChact() {
  const id = getActiveChat();
  if (!id) {
    Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
    return false;
  }
  const responce = checkStatus(await chatApi.delete({ chatId: id }));
  if (responce.error) {
    Store.set(ErrorsChats.errorDeleteChat, `Ошибка удаление чата: ${responce.error.reason}`);
    return false;
  }
  getChats();
  Store.set('activeChatId', null);
  return true;
}

async function addUserChat(login:string) {
  const id = getActiveChat();
  if (!id) {
    Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
  }
  const responceSearch = await userApi.searchUser({ login });
  if (responceSearch.data && responceSearch.data[0]) {
    await chatApi.addUser({ users: [responceSearch.data[0].id], chatId: id });
  }
}

async function deleteUserChat(login:string) {
  const id = getActiveChat();
  if (!id) {
    Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
  }
  const responceSearch = await userApi.searchUser({ login });
  if (responceSearch.data && responceSearch.data[0]) {
    await chatApi.deleteUser({ users: [responceSearch.data[0].id], chatId: id });
  }
}

function clearError(error:ErrorsChats) {
  Store.set(error, '');
}

export {
  ErrorsChats,
  clearError,
  setActiveChat,
  createChat,
  getChats,
  deleteChact,
  addUserChat,
  deleteUserChat,
};
