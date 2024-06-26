import ChatApi from '../api/ChatApi';
import MessageApi from '../api/MessageApi';
import ResourcesAPI from '../api/ResourcesAPI';
import constants from '../constants';
import Store from '../core/Store';
import { MessageDTO } from '../dto/MessageDTO';
import { ListMessage, Message } from '../types/Message';
import { formatDate } from '../utils/formatDate';
import { getActiveChatId, getToken } from './chats';
import { getUser } from './user';

const messageApi = new MessageApi();
const chatApi = new ChatApi();
const resourcesAPI = new ResourcesAPI();

let offset = 0;
let noReadCount = -1;
let last = false;

type SendMessage = {
    (message:string):void,
    (message:File):void
}

const getListMessage = () => {
  const list = Store.getState().listMessage as ListMessage;
  return Array.isArray(list) ? structuredClone(list) : [];
};

const formatMessage = (data:MessageDTO, userId:number):Message => ({
  type: data.file ? 'photo' : 'text',
  id: data.id,
  value: data.file ? constants.GET_PHOTO + data.file.path : data.content,
  myMessage: data.user_id === userId,
  time: formatDate(data.time).time,
});

const formatListMessage = (data:Array<MessageDTO>) => {
  const user = getUser();
  if (!user) return;
  const list = getListMessage();
  const newListObj = data.reverse().reduce((res:Record<string, Array<Message>>, item) => {
    const day = formatDate(item.time).dayString;
    if (!res[day]) {
      res[day] = [];
    }
    res[day].push(formatMessage(item, user.id));
    return res;
  }, {});
  const newList = Object.entries(newListObj).map(([key, value]) => ({
    day: key,
    messages: value,
  }));
  if (newList[newList.length - 1]?.day === list[0]?.day && Array.isArray(newList[newList.length - 1]?.messages)) {
    list[0].messages = [...newList[newList.length - 1].messages, ...list[0].messages];
    newList.pop();
  }
  Store.set('listMessage', [...newList, ...list]);
};

const pushMessage = (data:MessageDTO) => {
  const user = getUser();
  if (!user) return;
  const list = getListMessage();
  let lastIndex = list.length - 1;
  if (!list[lastIndex]) {
    list.push({
      day: formatDate(data.time).dayString,
      messages: [],
    });
    lastIndex++;
  }
  list[lastIndex].messages.push(formatMessage(data, user.id));
  Store.set('listMessage', list);
};

const getOldMessage = () => {
  if (last) return;
  messageApi.getMessages(offset);
};

const getNoReadMessage = async () => {
  try {
    if (noReadCount === -1) {
      const chatID = getActiveChatId();
      if (!chatID) return;
      const responce = await chatApi.getNewMessageCount(chatID);
      if (responce.data) {
        noReadCount = responce.data.unread_count;
      }
    }
    if (offset >= noReadCount + 20) return;
    getOldMessage();
  } catch (e) {
    console.log(e);
  }
};

const getMessage = (data:Array<MessageDTO>|MessageDTO) => {
  if (Array.isArray(data)) {
    formatListMessage(data);
    if (data[0]?.id) {
      offset = data[0].id;
    }
    if (!data.length) last = true;
  } else {
    pushMessage(data);
  }
  getNoReadMessage();
};

const getOpenConnect = () => {
  getNoReadMessage();
};

const callbackError = () => {
  Store.set('errorMessage', 'Произошла ошибка при отпраки сообщения');
};

const openChat = () => {
  messageApi.close();
  const token = getToken();
  const user = getUser();
  const chatID = getActiveChatId();
  Store.set('errorMessage', '');
  if (!token || !user || !chatID) return;
  offset = 0;
  noReadCount = -1;
  last = false;
  Store.set('listMessage', []);
  messageApi.init(user.id, chatID, token, getMessage, getOpenConnect, callbackError);
};

const sendMessage:SendMessage = async (message) => {
  Store.set('errorMessage', '');
  if (typeof message === 'string') {
    messageApi.sendMessageText(message);
  }
  if (message instanceof File) {
    try {
      const responce = await resourcesAPI.uploadFile({ resource: message });
      if (responce.data) {
        messageApi.sendMessageFile(responce.data.id);
      }
      if (responce.error) {
        Store.set('errorMessage', 'Произошла ошибка при загрузки файла');
      }
    } catch (e) {
      Store.set('errorMessage', 'Произошла ошибка при загрузки файла');
    }
  }
};

export {
  openChat,
  sendMessage,
  getOldMessage,
};
