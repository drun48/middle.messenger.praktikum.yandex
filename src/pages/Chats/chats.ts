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

export class PageChats extends Block {
  constructor(props: Props) {
    super({
      ...props,
      arrow,
      search: '',
      menu,
      activeChat: false,
      activeChatId: null,
      searchChat: (event: Event) => this.searchChat(event),
      sendMessage: () => this.sendMessage(),
      clickCard: (event: Event, id: string) => {
        this.props.activeChat = true;
        this.props.activeChatId = id;
      },
      openModalAttach: () => this.openModalAttach(),
      controllerChat: (str: string) => this.controllerChat(str),
      openModalControllerChat: (event: Event) => this.openModalControllerChat(event),
      addUser: (value: string) => this.addUser(value),
      deleteUser: (value: string) => this.deleteUser(value),
      deleteChat: () => this.deleteChat(),
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
    });
  }

  listChat: Array<Record<string, string>> = [
    {
      id: '1',
      name: 'Андрей',
      message: 'Изображение',
      photo: avatar,
      time: '10:49',
      count: '2',
    },
    {
      id: '2',
      name: 'Киноклуб',
      meMessage: 'стикер',
      photo: avatar,
      time: '12:00',
      count: '',
    },
    {
      id: '3',
      name: 'Илья',
      message:
        'Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!',
      photo: avatar,
      time: '15:12',
      count: '4',
    },
    {
      id: '4',
      name: 'Вадим',
      message: 'Круто!',
      photo: avatar,
      time: '15:12',
    },
    {
      id: '5',
      name: 'тет-а-теты',
      message:
        'И Human Interface Guidelines и Material Design рекомендуют И Human Interface Guidelines и Material Design рекомендуют',
      photo: avatar,
      time: 'Пт',
    },
    {
      id: '6',
      name: 'Design Destroyer',
      message:
        'Миллионы россиян ежедневно проводят десятки часов свое Миллионы россиян ежедневно проводят десятки часов свое',
      photo: avatar,
      time: 'Ср',
    },
    {
      id: '7',
      name: 'Стас Рогозин',
      message:
        'В 2008 году художник Jon Rafman  начал собирать В 2008 году художник Jon Rafman  начал собирать',
      photo: avatar,
      time: 'Пн',
    },
    {
      id: '8',
      name: 'Петров',
      message:
        'Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир',
      photo: avatar,
      time: 'Пн',
    },
    {
      id: '9',
      name: 'Настя',
      message: 'Можно или сегодня или завтра вечером.',
      photo: avatar,
      time: '1 Мая 2020',
    },
    {
      id: '10',
      name: 'Design Destroyer',
      message:
        'Миллионы россиян ежедневно проводят десятки часов свое Миллионы россиян ежедневно проводят десятки часов свое',
      photo: avatar,
      time: 'Ср',
    },
    {
      id: '11',
      name: 'Стас Рогозин',
      message:
        'В 2008 году художник Jon Rafman  начал собирать В 2008 году художник Jon Rafman  начал собирать',
      photo: avatar,
      time: 'Пн',
    },
    {
      id: '12',
      name: 'Петров',
      message:
        'Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир',
      photo: avatar,
      time: 'Пн',
    },
    {
      id: '13',
      name: 'Настя',
      message: 'Можно или сегодня или завтра вечером.',
      photo: avatar,
      time: '1 Мая 2020',
    },
  ];

  componentDidMount() {
    this.props.filterListChat = this.listChat;
  }

  searchChat(event: Event) {
    const target = event.target as HTMLInputElement;
    this.props.search = target.value;
    if (!target.value) {
      this.props.filterListChat = this.listChat;
      return;
    }
    this.props.filterListChat = this.listChat.filter((item) => item.name.includes(target.value));
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

  // eslint-disable-next-line class-methods-use-this
  addUser(value: string) {
    console.log(value);
  }

  // eslint-disable-next-line class-methods-use-this
  deleteUser(value: string) {
    console.log(value);
  }

  deleteChat() {
    console.log('Удалить чат', this.props.activeChatId);
  }

  protected render() {
    return `<div class="wrapper-chat">
    {{{ ModalUser ref="modalAdd" title="Добавить пользователя" labelButton="Добавить" global=true getLogin=addUser}}}
    {{{ ModalUser ref="modalDelete" title="Удалить пользователя" labelButton='Удалить' global=true getLogin=deleteUser}}}
    {{{ ModalDeleteChat delete=deleteChat ref="modalDeleteChat" global=true}}}
    <div class="wrapper-choice">
        <div class="container-search">
            <div class="container-search__nav">
                <a class="container-search__nav__element">
                    <p>Профиль</p>
                    <img src="{{arrow}}" alt="Иконка"/>
                </a>
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
                      {{{ CardUser onClick=../this.clickCard id=id photo=this.photo name=this.name message=this.message time=this.time 
                        count=this.count meMessage=this.meMessage }}}
                  </li>
                  <div class="list-chat__delimiter"></div>
                {{/each}}
            </ul>
        </div>
    </div>
    {{#if (isEqual activeChat false)}}
        <div class="empty-chat">
            <h3>Выберите чат чтобы отправить сообщение</h3>
        </div>
    {{else}}
      <div class="container-chat">
        <div class="container-chat__profile">
              {{{ CardUser name="Вадим" photo=photoUser }}}
              <div class="container-chat__profile__menu">
                {{#Button onClick=openModalControllerChat}}
                  <img src="{{menu}}" alt="Иконка"/>
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
                  <img src="{{attacher}}" alt="Иконка"/>
                {{/Button}}
                {{{ ModalList class="modal-attach" list=listAttach ref="modalAttach" }}}
              </div>
              <div class="container-chat__input__element">
                  {{{ InputMessage ref="inputMessage" placeholder="Сообщение" }}}
              </div>
              {{#Button class="container-chat__input__button" onClick=sendMessage}}
                <img src="{{arrowCircle}}" alt="Иконка">
              {{/Button}}
              <div class="container-chat__input__button">
              </div>
      </div>
      </div>
    {{/if}}
</div>`;
  }
}
