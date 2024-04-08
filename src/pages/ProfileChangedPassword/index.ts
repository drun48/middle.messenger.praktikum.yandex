import Handlebars from "handlebars";
export { default as PageProfileChangedPassword } from "./index.hbs?raw";

Handlebars.registerHelper("profileFormChangedPassword", () => [
  {
    label: "Старый пароль",
    value: "password",
    type: "password",
    readonly: false,
  },
  {
    label: "Новый пароль",
    value: "new_password",
    type: "password",
    readonly: false,
  },
  {
    label: "Повторите новый пароль",
    value: "new_password",
    type: "password",
    readonly: false,
  },
]);
