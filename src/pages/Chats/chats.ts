import { Block, Props } from '../../core/Block';
import avatar from '../../assets/photoUser.png';
import arrow from '../../assets/arrow.svg';
import menu from '../../assets/menu.svg';

import changeAvatar from '../../assets/change_avatar.svg';
import { InputMessage } from '../../components/input-message';
import { ModalUser } from '../../components/modal-user';
import { ModalList } from '../../components/modal-list';
import { ModalDeleteChat } from '../../components/modal-delete-chat/modalDeleteChat';

import photoAttach from '../../assets/PhotoAttach.svg';

import addUser from '../../assets/AddUser.svg';
import deleteUser from '../../assets/DeleteUser.svg';
import deleteChat from '../../assets/delete_chat.svg';
import addChatIcon from '../../assets/icon-add.svg';

import arrowCircle from '../../assets/arrow-circle.svg';
import attacher from '../../assets/attacher.svg';
import {
  addUserChat, changeChatAvatar, deleteUserChat, getChats, setActiveChat,
} from '../../services/chats';
import connect from '../../core/connect';
import { ModalAddChat } from '../../components/modal-add-chat/modalAddChat';
import { Chat, ModalUploadFile } from '../../components';
import { getOldMessage, sendMessage } from '../../services/message';

class PageChats extends Block {
  constructor(props: Props) {
    super({
      ...props,
      arrow,
      search: '',
      menu,
      addChatIcon,
      searchChat: (event: Event) => this.searchChat(event),
      sendMessage: () => this.sendMessage(),
      clickCard: (id: number) => {
        setActiveChat(id);
      },
      openModalAttach: () => this.openModalAttach(),
      controllerChat: (str: string) => this.controllerChat(str),
      fileMessage: () => (this.refs.modalUploadPhotoMessage as ModalUploadFile).open(),
      openModalControllerChat: (event: Event) => this.openModalControllerChat(event),
      addUser: (value: string) => this.addUser(value),
      uploadPhotoVideoMessage: (file:File) => this.uploadPhotoVideoMessage(file),
      deleteUser: (value: string) => this.deleteUser(value),
      openModalAddChat: () => this.openModalAddChat(),
      changeChatAvatar: (file:File) => this.changeChatAvatar(file),
      scrollTop: (oldHeight:number) => {
        getOldMessage();
        this.setProps({ oldHeightScrollChat: oldHeight });
      },
      filterListChat: [],
      listAttach: [
        {
          value: 'Фото',
          photo: photoAttach,
        },
      ],
      listControllerChat: [
        {
          value: 'Добавить пользователя',
          photo: addUser,
        },
        {
          value: 'Удалить пользователя',
          photo: deleteUser,
        },
        {
          value: 'Поменять фото',
          photo: changeAvatar,
        },
        {
          value: 'Удалить чат',
          photo: deleteChat,
        },
      ],
      arrowCircle,
      attacher,
      photoUser: avatar,
      watch: {
        listChat: () => {
          this.props.filterListChat = this.props.listChat;
        },
        listMessage: (newValue, oldValue) => {
          if (!Array.isArray(oldValue)) return;
          if (Array.isArray(newValue) && oldValue.length && newValue.length) {
            const newMesseges = newValue[newValue.length - 1].messages as Array<any>;
            const oldMessages = oldValue[oldValue.length - 1].messages as Array<any>;
            if (newMesseges[newMesseges.length - 1]?.id === oldMessages[oldMessages.length - 1]?.id) {
              setTimeout(() => {
                (this.refs.chat as Chat).scrollToOldHeight(this.props.oldHeightScrollChat ?? 0);
              }, 100);
              return;
            }
          }
          setTimeout(() => {
            (this.refs.chat as Chat)?.scrollBottomChat();
          }, 100);
        },
      },
    });
    getChats();
  }

  componentDidMount() {
    this.props.filterListChat = this.props.listChat;
  }

  searchChat(event: Event) {
    const target = event.target as HTMLInputElement;
    this.props.search = target.value;
    if (!target.value) {
      this.props.filterListChat = this.props.listChat;
      return;
    }

    this.props.filterListChat = this.props.listChat.filter((item) => item.title.includes(target.value));
  }

  sendMessage() {
    const component = this.refs.inputMessage as InputMessage;
    const message = component.getValue();
    if (!message) return;
    sendMessage(message);
  }

  openModalControllerChat(event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    const modal = this.refs.modalControllerChat as ModalList;
    if (!modal.getState()) {
      modal.open();
    } else {
      modal.close();
    }
  }

  openModalAttach() {
    const modal = this.refs.modalAttach as ModalList;
    if (!modal.getState()) {
      modal.open();
    } else {
      modal.close();
    }
  }

  controllerChat(str: string) {
    switch (str) {
      case 'Добавить пользователя':
        (this.refs.modalAdd as ModalUser).open();
        break;
      case 'Удалить пользователя':
        (this.refs.modalDelete as ModalUser).open();
        break;
      case 'Поменять фото':
        (this.refs.modalChangeChatAvatar as ModalUploadFile).open();
        break;
      case 'Удалить чат':
        (this.refs.modalDeleteChat as ModalDeleteChat).open();
        break;
    }
  }

  addUser(value: string) {
    addUserChat(value);
  }

  deleteUser(value: string) {
    deleteUserChat(value);
  }

  changeChatAvatar(file:File) {
    changeChatAvatar(file);
  }

  openModalAddChat() {
    (this.refs.modalAddChat as ModalAddChat).open();
  }

  uploadPhotoVideoMessage(file:File) {
    sendMessage(file);
  }

  protected render() {
    return `<div class="wrapper-chat">
    {{{ ModalUser ref="modalAdd" title="Добавить пользователя" labelButton="Добавить" global=true getLogin=addUser}}}
    {{{ ModalUser ref="modalDelete" title="Удалить пользователя" labelButton='Удалить' global=true getLogin=deleteUser}}}
    {{{ ModalDeleteChat ref="modalDeleteChat" global=true }}}
    {{{ ModalAddChat ref="modalAddChat" global=true}}}
    {{{ ModalUploadFile ref="modalChangeChatAvatar" upload=changeChatAvatar input_name="avatar" labelButton="Поменять" accept="image/gif, image/jpeg, image/png" global=true}}}
    {{{ ModalUploadFile ref="modalUploadPhotoMessage" upload=uploadPhotoVideoMessage input_name="file" labelButton="Отправить" accept="image/jpeg, image/jpg, image/png, image/gif, image/webp" global=true}}}
    <div class="wrapper-choice">
        <div class="container-search">
            <div class="container-search__nav">
              {{#Button class="icon-add-chat" onClick=openModalAddChat }}
                <img src="{{addChatIcon}}" alt="Добавить чат">
              {{/Button}}
              {{#RouterLink to="/settings" class="container-search__nav__element"}}
                <p>Профиль</p>
                <img src="{{arrow}}" alt="Перейти в профиль"/>
              {{/RouterLink}}
            </div>
            <div class="container-search__element">
                {{{ InputSearch ref="search" onBlur=searchChat value=search}}}
            </div>
        </div>
        <div class="container-chats">
            <ul class="list-chat">
                <div class="list-chat__delimiter"></div>
                {{#each filterListChat}}
                  <li class="list-chat__element {{#if (isEqual id ../this.activeChatId) }}active{{/if}}">
                      {{{ CardUser onClick=../this.clickCard id=id photo=this.avatar name=this.title message=this.message time=this.timw 
                        count=this.unread_count meMessage=this.meMessage }}}
                  </li>
                  <div class="list-chat__delimiter"></div>
                {{/each}}
            </ul>
        </div>
    </div>
    {{#if (isEqual activeChatId null)}}
        <div class="empty-chat">
            <h3>Выберите чат чтобы отправить сообщение</h3>
        </div>
    {{else}}
      <div class="container-chat">
        <div class="container-chat__profile">
              {{{ CardUser name=activeChat.title photo=activeChat.avatar }}}
              <div class="container-chat__profile__menu">
                {{#Button onClick=openModalControllerChat}}
                  <img src="{{menu}}" alt="Иконка меню чата"/>
                {{/Button}}
                {{{ ModalList class="modal-controller-chat" controller=controllerChat list=listControllerChat ref="modalControllerChat"}}}
              </div>
        </div>
          <div class="container-chat__element">
              {{{ Chat ref="chat" listMessage=listMessage scrollTop=scrollTop }}}
          </div>
          <div class="container-chat__input">
              <div class="container-chat__input__attacher">
                {{#Button onClick=openModalAttach}}
                  <img src="{{attacher}}" alt="Иконка прикрепления файла"/>
                {{/Button}}
                {{{ ModalList class="modal-attach" controller=fileMessage list=listAttach ref="modalAttach" }}}
              </div>
              <div class="container-chat__input__element">
                  {{{ InputMessage ref="inputMessage" placeholder="Сообщение" }}}
              </div>
              {{#Button class="container-chat__input__button" onClick=sendMessage}}
                <img src="{{arrowCircle}}" alt="Иконка отправки сообщения">
              {{/Button}}
              <div class="container-chat__input__button">
              </div>
      </div>
      </div>
    {{/if}}
</div>`;
  }
}

export default connect(({
  listChat, activeChatId = null, activeChat, listMessage,
}) => ({
  listChat, activeChatId, activeChat, listMessage,
}))(PageChats);
