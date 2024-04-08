import Handlebars from "handlebars";
import "./style.css";
export { default as PageProfileChanged } from "./index.hbs?raw";

Handlebars.registerHelper("profileFormChanged", () => [
  {
    label: "Почта",
    value: "pochta@yandex.ru",
    type: "email",
    readonly: false,
  },
  {
    label: "Логин",
    value: "ivanivanov",
    type: "login",
    readonly: false,
  },
  {
    label: "Имя",
    value: "Иван",
    type: "text",
    readonly: false,
  },
  {
    label: "Фамилия",
    value: "Иванов",
    type: "text",
    readonly: false,
  },
  {
    label: "Имя в чате",
    value: "Иван",
    type: "text",
    readonly: false,
  },
  {
    label: "Телефон",
    value: "+7 (909) 967 30 30",
    type: "tel",
    readonly: false,
  },
]);
