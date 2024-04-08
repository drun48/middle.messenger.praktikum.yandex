import Handlebars from "handlebars";
import "./style.css";
import avatar from "../../assets/photoUser.png";
// import PageListChat from "./index.hbs?raw";

export { default as PageListChat } from "./index.hbs?raw";

// Handlebars.registerPartial("PageListChat", PageListChat);

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
