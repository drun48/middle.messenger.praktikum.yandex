import { Block, Props } from "../../core/Block";
import avatar from "../../assets/photoUser.png";
import arrow from "../../assets/arrow.svg";

export class PageSelectedChats extends Block {
  constructor(props: Props) {
    super({
      ...props,
      arrow,
      listChat: [
        {
          name: "Андрей",
          message: "Изображение",
          photo: avatar,
          time: "10:49",
          count: "2",
        },
        {
          name: "Киноклуб",
          meMessage: "стикер",
          photo: avatar,
          time: "12:00",
          count: "",
        },
        {
          name: "Илья",
          message:
            "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
          photo: avatar,
          time: "15:12",
          count: "4",
        },
        { name: "Вадим", message: "Круто!", photo: avatar, time: "15:12" },
        {
          name: "тет-а-теты",
          message:
            "И Human Interface Guidelines и Material Design рекомендуют И Human Interface Guidelines и Material Design рекомендуют",
          photo: avatar,
          time: "Пт",
        },
        {
          name: "Design Destroyer",
          message:
            "Миллионы россиян ежедневно проводят десятки часов свое Миллионы россиян ежедневно проводят десятки часов свое",
          photo: avatar,
          time: "Ср",
        },
        {
          name: "Стас Рогозин",
          message:
            "В 2008 году художник Jon Rafman  начал собирать В 2008 году художник Jon Rafman  начал собирать",
          photo: avatar,
          time: "Пн",
        },
        {
          name: "Петров",
          message:
            "Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир",
          photo: avatar,
          time: "Пн",
        },
        {
          name: "Настя",
          message: "Можно или сегодня или завтра вечером.",
          photo: avatar,
          time: "1 Мая 2020",
        },
        {
          name: "Design Destroyer",
          message:
            "Миллионы россиян ежедневно проводят десятки часов свое Миллионы россиян ежедневно проводят десятки часов свое",
          photo: avatar,
          time: "Ср",
        },
        {
          name: "Стас Рогозин",
          message:
            "В 2008 году художник Jon Rafman  начал собирать В 2008 году художник Jon Rafman  начал собирать",
          photo: avatar,
          time: "Пн",
        },
        {
          name: "Петров",
          message:
            "Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир",
          photo: avatar,
          time: "Пн",
        },
        {
          name: "Настя",
          message: "Можно или сегодня или завтра вечером.",
          photo: avatar,
          time: "1 Мая 2020",
        },
      ],
    });
  }

  protected render() {
    return `<div class="wrapper-chat">
    <div class="wrapper-choice">
        <div class="container-search">
            <div class="container-search__nav">
                <a class="container-search__nav__element">
                    <p>Профиль</p>
                    <img src="{{arrow}}" alt="Иконка"/>
                </a>
            </div>
            <div class="container-search__element">
                {{{ InputSearch }}}
            </div>
        </div>
        <div class="container-chats">
            <ul class="list-chat">
                <div class="list-chat__delimiter"></div>
                {{#each listChat}}
                <li class="list-chat__element">
                    {{{ CardUser photo=this.photo name=this.name message=this.message time=this.time count=this.count meMessage=this.meMessage}}}
                </li>
                <div class="list-chat__delimiter"></div>
                {{/each}}
            </ul>
        </div>
    </div>
    {{#if (isEqual component false)}}
        <div class="empty-chat">
            <h3>Выберите чат чтобы отправить сообщение</h3>
        </div>
    {{/if}}
</div>
`;
  }
}
