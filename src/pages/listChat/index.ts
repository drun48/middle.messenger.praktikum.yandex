import Handlebars from "handlebars";
import "./style.css";
import avatar from "../../assets/photoUser.png";
import photo1 from "../../assets/test_photo.jpg";
import photo2 from "../../assets/test_photo2.png";

export { default as ListChat } from "./index.hbs?raw";

Handlebars.registerHelper("listChat", () => [
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
]);

Handlebars.registerHelper("listMessage", () => [
  {
    day: "19 июня",
    messages: [
      {
        type: "text",
        value:
          "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        myMessage: false,
        time: "10:30",
      },
      {
        type: "text",
        value: "asd",
        myMessage: true,
        time: "10:30",
      },
      {
        type: "photo",
        value: photo1,
        myMessage: false,
        time: "10:30",
      },
      {
        type: "photo",
        value: photo2,
        myMessage: true,
        time: "10:31",
      },
    ],
  },
]);
