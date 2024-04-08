import Handlebars from "handlebars";
import "./style.css";
export { default as PageModals } from "./index.hbs?raw";

Handlebars.registerHelper("listAttach", () => [
  {
    value: "Фото или Видео",
    photo: "./src/assets/PhotoAttach.svg",
  },
  {
    value: "Файл",
    photo: "./src/assets/FileAttach.svg",
  },
  {
    value: "Локация",
    photo: "./src/assets/LocalAttach.svg",
  },
]);

Handlebars.registerHelper("listControllerChat", () => [
  {
    value: "Добавить пользователя",
    photo: "./src/assets/AddUser.svg",
  },
  {
    value: "Удалить пользователя",
    photo: "./src/assets/DeleteUser.svg",
  },
  {
    value: "Удалить чат",
    photo: "./src/assets/delete_chat.svg",
  },
]);
