import ChatApi from '../api/ChatApi';
import Store from '../core/Store';
import { checkStatus } from './checkStatus';
import avatar from '../assets/photoUser.png';
import UserApi from '../api/UserApi';
import constants from '../constants';
import { ChatDTO } from '../dto/ChatDTO';
import { openChat } from './message';
import { MethodFile, MethodNumber, MethodStr } from '../types/MethodService';

const chatApi = new ChatApi();
const userApi = new UserApi();

// eslint-disable-next-line no-shadow
enum ErrorsChats {
  errorCreateChat = 'errorCreateChat',
  errorDeleteChat = 'errorDeleteChat'
}

const formatChat = (chat:ChatDTO) => ({
  id: chat.id,
  // eslint-disable-next-line no-nested-ternary
  avatar: chat.avatar ? constants.GET_PHOTO + chat.avatar : chat.last_message?.user?.avatar ? constants.GET_PHOTO + chat.last_message.user.avatar : avatar,
  title: chat.title,
  unread_count: chat.unread_count,
  message: chat.content,
  time: chat.time,
});

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

const getActiveChatId = ():null|number => Store.getState().activeChatId as null|number;

const getToken = () => {
  const token = Store.getState().tokenChat as string;
  return token || null;
};

const getTokenApi = async () => {
  try {
    const id = getActiveChatId();
    if (!id) {
      return;
    }
    const responce = await chatApi.getToken(id);
    if (responce.data) {
      Store.set('tokenChat', responce.data.token);
    }
  } catch (e) {
    Store.set('tokenChat', null);
  }
};

const setActiveChat:MethodNumber = async (id) => {
  Store.set('activeChatId', id);
  Store.set('activeChat', findActiveChat(id));
  await getTokenApi();
  openChat();
};

const getChats = async () => {
  try {
    const responce = checkStatus(await chatApi.get());
    if (responce.data) {
      const list = responce.data.map((item) => formatChat(item));
      Store.set('listChat', list);
    }
    if (responce.error) {
      Store.set('listChat', []);
    }
  } catch (e) {
    Store.set('listChat', []);
  }
};

const createChat = async (title:string) => {
  try {
    const responce = checkStatus(await chatApi.create({ title }));
    if (responce.error) {
      Store.set(ErrorsChats.errorCreateChat, `Ошибка создание чата: ${responce.error.reason}`);
      return false;
    }
    getChats();
    return true;
  } catch (e) {
    Store.set(ErrorsChats.errorCreateChat, 'Ошибка создание чата');
    return false;
  }
};

const deleteChact = async () => {
  try {
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
  } catch (e) {
    Store.set(ErrorsChats.errorDeleteChat, 'Ошибка удаление чата');
    return false;
  }
};

const addUserChat:MethodStr = async (login) => {
  try {
    const id = getActiveChatId();
    if (!id) {
      Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
      return;
    }
    const responceSearch = await userApi.searchUser({ login });
    if (responceSearch.data && responceSearch.data[0]) {
      await chatApi.addUser({ users: [responceSearch.data[0].id], chatId: id });
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteUserChat:MethodStr = async (login) => {
  try {
    const id = getActiveChatId();
    if (!id) {
      Store.set(ErrorsChats.errorDeleteChat, 'Нет активного чата');
      return;
    }
    const responceSearch = await userApi.searchUser({ login });
    if (responceSearch.data && responceSearch.data[0]) {
      await chatApi.deleteUser({ users: [responceSearch.data[0].id], chatId: id });
    }
  } catch (e) {
    console.log(e);
  }
};

const changeChatAvatar:MethodFile = async (file) => {
  try {
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
  } catch (e) {
    console.log(e);
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
  getToken,
  getActiveChatId,
};
