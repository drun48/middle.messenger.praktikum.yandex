import ChatApi from '../api/ChatApi';
import MessageApi from '../api/MessageApi';
import Store from '../core/Store';
import { formatDate } from '../utils/formatDate';
import { getActiveChatId, getToken } from './chats';
import { getUser } from './user';

const messageApi = new MessageApi();
const chatApi = new ChatApi();

let offset = 0;
let noReadCount = -1;

type SendMessage = {
    (message:string):void,
    (message:File):void
}

const getListMessage = () => {
  const list = Store.getState().listMessage;
  return Array.isArray(list) ? structuredClone(list) : [];
};

const formatMessage = (data:any, userId:number) => ({
  type: data.file ? 'photo' : 'text',
  id: data.id,
  value: data.content,
  myMessage: data.user_id === userId,
  time: formatDate(data.time).time,
});

const formatListMessage = (data:any) => {
  const user = getUser();
  if (!user) return;
  const list = getListMessage();
  const newListObj = data.reverse().reduce((res, item) => {
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
  if (newList[newList.length - 1]?.day === list[0]?.day) {
    list[0].message = [...newList[newList.length - 1].messages, ...list[0].messages];
    newList.pop();
  }
  Store.set('listMessage', [...newList, ...list]);
};

const pushMessage = (data:any) => {
  const user = getUser();
  if (!user) return;
  const list = getListMessage();
  let last = list.length - 1;
  if (!list[last]) {
    list.push({
      day: formatDate(data.time).dayString,
      messages: [],
    });
    last++;
  }
  list[last].messages.push(formatMessage(data, user.id));
  Store.set('listMessage', list);
};

const getOldMessage = () => {
  messageApi.getMessages(offset);
};

const getNoReadMessage = async () => {
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
};

const getMessage = (data:any) => {
  if (Array.isArray(data)) {
    formatListMessage(data);
    if (data[0]?.id) {
      offset = data[0].id;
    }
  } else {
    pushMessage(data);
  }
  getNoReadMessage();
};

const getOpenConnect = () => {
  getNoReadMessage();
};

const openChat = () => {
  messageApi.close();
  const token = getToken();
  const user = getUser();
  const chatID = getActiveChatId();
  if (!token || !user || !chatID) return;
  offset = 0;
  noReadCount = -1;
  Store.set('listMessage', []);
  messageApi.init(user.id, chatID, token, getMessage, getOpenConnect);
};

const sendMessage:SendMessage = (message) => {
  if (typeof message === 'string') {
    messageApi.sendMessageText(message);
  }
  if (message instanceof File) {
    messageApi.sendMessageFile(1);
  }
};

export {
  openChat,
  sendMessage,
  getOldMessage,
};
