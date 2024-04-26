import Handlebars from "handlebars";
import "./style.css";
export { PageModals } from "./modals";

import photo_attach from "../../assets/PhotoAttach.svg";
import file_attach from "../../assets/FileAttach.svg";
import local_attach from "../../assets/LocalAttach.svg";

import addUser from "../../assets/AddUser.svg";
import delete_user from "../../assets/DeleteUser.svg";
import delete_chat from "../../assets/delete_chat.svg";

Handlebars.registerHelper("listAttach", () => [
  {
    value: "Фото или Видео",
    photo: photo_attach,
  },
  {
    value: "Файл",
    photo: file_attach,
  },
  {
    value: "Локация",
    photo: local_attach,
  },
]);

Handlebars.registerHelper("listControllerChat", () => [
  {
    value: "Добавить пользователя",
    photo: addUser,
  },
  {
    value: "Удалить пользователя",
    photo: delete_user,
  },
  {
    value: "Удалить чат",
    photo: delete_chat,
  },
]);
