import ChatApi from '../api/ChatApi';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';
import avatar from '../assets/photoUser.png';
import UserApi from '../api/UserApi';
import constants from '../constants';
import { ChatDTO } from '../dto/ChatDTO';

const chatApi = new ChatApi();
const userApi = new UserApi();

// eslint-disable-next-line no-shadow
enum ErrorsChats {
  errorCreateChat = 'errorCreateChat',
  errorDeleteChat = 'errorDeleteChat'
}

const getListChat = () => {
  const { listChat } = Store.getState();
  return Array.isArray(listChat) ? [...listChat] as Array<ChatDTO> : [];
};

const findActiveChatIndex = (id:number) => {
  const listChat = getListChat();
  const chatIndex = listChat.findIndex((item) => item.id === id);
  return chatIndex;
};

const findActiveChat = (id:number) => {
  const listChat = getListChat();
  const chatIndex = findActiveChatIndex(id);
  return chatIndex !== -1 ? { ...listChat[chatIndex] } : null;
};

const formatChat = (chat:ChatDTO) => ({
  id: chat.id,
  // eslint-disable-next-line no-nested-ternary
  avatar: chat.avatar ? constants.GET_PHOTO + chat.avatar : chat.last_message?.user?.avatar ? constants.GET_PHOTO + chat.last_message.user.avatar : avatar,
  title: chat.title,
  unread_count: chat.unread_count,
  message: chat.content,
  time: chat.time,
});

const getActiveChatId = ():null|number => Store.getState().activeChatId as null|number;

const getToken = async () => {
  const id = getActiveChatId();
  if (!id) {
    return;
  }
  const responce = await chatApi.getToken(id);
  if (responce.data) {
    Store.getState('tokenChat', responce.data.token);
  }
};

const setActiveChat = (id:number) => {
  Store.set('activeChatId', id);
  Store.set('activeChat', findActiveChat(id));
  getToken();
};

const getChats = async () => {
  const responce = checkStatus(await chatApi.get());
  if (responce.data) {
    const list = responce.data.map((item) => formatChat(item));
    Store.set('listChat', list);
  }
  if (responce.error) {
    Store.set('listChat', []);
  }
};

const createChat = async (title:string) => {
  const responce = checkStatus(await chatApi.create({ title }));
  if (responce.error) {
    Store.set(ErrorsChats.errorCreateChat, `Ошибка создание чата: ${responce.error.reason}`);
    return false;
  }
  getChats();
  return true;
};

const deleteChact = async () => {
  const id = getActiveChatId();
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
};

const addUserChat = async (login:string) => {
  const id = getActiveChatId();
  if (!id) {
    Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
    return;
  }
  const responceSearch = await userApi.searchUser({ login });
  if (responceSearch.data && responceSearch.data[0]) {
    await chatApi.addUser({ users: [responceSearch.data[0].id], chatId: id });
  }
};

const deleteUserChat = async (login:string) => {
  const id = getActiveChatId();
  if (!id) {
    Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
    return;
  }
  const responceSearch = await userApi.searchUser({ login });
  if (responceSearch.data && responceSearch.data[0]) {
    await chatApi.deleteUser({ users: [responceSearch.data[0].id], chatId: id });
  }
};

const changeChatAvatar = async (file:File) => {
  const id = getActiveChatId();
  if (!id) {
    Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
    return;
  }
  const responce = await chatApi.updateAvatar({ avatar: file, chatId: id });
  if (responce.data) {
    const listChat = getListChat();
    const chatIndex = findActiveChatIndex(id);
    if (chatIndex !== -1) {
      listChat[chatIndex].avatar = constants.GET_PHOTO + responce.data.avatar;
      Store.set('listChat', listChat);
      Store.set('activeChat', { ...listChat[chatIndex] });
    }
  }
};

const clearError = (error:ErrorsChats) => {
  Store.set(error, '');
};

export {
  ErrorsChats,
  clearError,
  setActiveChat,
  createChat,
  getChats,
  deleteChact,
  addUserChat,
  changeChatAvatar,
  deleteUserChat,
};
