import Handlebars from "handlebars";
import "./style.css";
import photo1 from "../../../assets/test_photo.jpg";
import photo2 from "../../../assets/test_photo2.png";
export { default as PageChat } from "./index.hbs?raw";

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
