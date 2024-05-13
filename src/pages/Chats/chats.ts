import { Block, Props } from '../../core/Block';
import avatar from '../../assets/photoUser.png';
import arrow from '../../assets/arrow.svg';
import menu from '../../assets/menu.svg';
import photo1 from '../../assets/test_photo.jpg';
import photo2 from '../../assets/test_photo2.png';
import { InputMessage } from '../../components/input-message';
import { ModalUser } from '../../components/modal-user';
import { ModalList } from '../../components/modal-list';
import { ModalDeleteChat } from '../../components/modal-delete-chat';

import photoAttach from '../../assets/PhotoAttach.svg';
import fileAttach from '../../assets/FileAttach.svg';
import localAttach from '../../assets/LocalAttach.svg';

import addUser from '../../assets/AddUser.svg';
import deleteUser from '../../assets/DeleteUser.svg';
import deleteChat from '../../assets/delete_chat.svg';
import addChatIcon from '../../assets/icon-add.svg';

import arrowCircle from '../../assets/arrow-circle.svg';
import attacher from '../../assets/attacher.svg';
import {
  addUserChat, deleteUserChat, getChats, setActiveChat,
} from '../../services/chats';
import connect from '../../core/connect';
import { ModalAddChat } from '../../components/modal-add-chat/modalAddChat';

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
      openModalControllerChat: (event: Event) => this.openModalControllerChat(event),
      addUser: (value: string) => this.addUser(value),
      deleteUser: (value: string) => this.deleteUser(value),
      openModalAddChat: () => this.openModalAddChat(),
      filterListChat: [],
      listMessage: [
        {
          day: '19 июня',
          messages: [
            {
              type: 'text',
              value:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
              myMessage: false,
              time: '10:30',
            },
            {
              type: 'text',
              value: 'asd',
              myMessage: true,
              time: '10:30',
            },
            {
              type: 'photo',
              value: photo1,
              myMessage: false,
              time: '10:30',
            },
            {
              type: 'photo',
              value: photo2,
              myMessage: true,
              time: '10:31',
            },
          ],
        },
      ],
      listAttach: [
        {
          value: 'Фото или Видео',
          photo: photoAttach,
        },
        {
          value: 'Файл',
          photo: fileAttach,
        },
        {
          value: 'Локация',
          photo: localAttach,
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
    console.log(message);
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

  openModalAddChat() {
    (this.refs.modalAddChat as ModalAddChat).open();
  }

  protected render() {
    return `<div class="wrapper-chat">
    {{{ ModalUser ref="modalAdd" title="Добавить пользователя" labelButton="Добавить" global=true getLogin=addUser}}}
    {{{ ModalUser ref="modalDelete" title="Удалить пользователя" labelButton='Удалить' global=true getLogin=deleteUser}}}
    {{{ ModalDeleteChat ref="modalDeleteChat" global=true }}}
    {{{ ModalAddChat ref="modalAddChat" global=true}}}
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
              {{{ CardUser name=user.first_name photo=user.avatar }}}
              <div class="container-chat__profile__menu">
                {{#Button onClick=openModalControllerChat}}
                  <img src="{{menu}}" alt="Иконка меню чата"/>
                {{/Button}}
                {{{ ModalList class="modal-controller-chat" controller=controllerChat list=listControllerChat ref="modalControllerChat"}}}
              </div>
        </div>
          <div class="container-chat__element">
              {{{ Chat listMessage=listMessage }}}
          </div>
          <div class="container-chat__input">
              <div class="container-chat__input__attacher">
                {{#Button onClick=openModalAttach}}
                  <img src="{{attacher}}" alt="Иконка прикрепления файла"/>
                {{/Button}}
                {{{ ModalList class="modal-attach" list=listAttach ref="modalAttach" }}}
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

export default connect(({ listChat, activeChatId = null, user }) => ({ listChat, activeChatId, user }))(PageChats);
