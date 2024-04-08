import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import arrow_circle from './assets/arrow-circle.svg'
import arrow from './assets/arrow.svg'
import attacher from './assets/attacher.svg'
import menu from './assets/menu.svg'
import photo_user from './assets/photoUser.png'
import profil_photo from './assets/profile_photo.svg'

const pages = {
  nav: [Pages.NavPage],
  login: [Pages.LoginPage],
  signin: [Pages.PageSign],
  // listChat: [Pages.PageListChat, {arrow:arrow, attacher:attacher, menu:menu}],
  // chat: [Pages.PageChat, {arrow_circle:arrow_circle, photo_user:photo_user}],
  profile: [Pages.PageProfile, {arrow_circle:arrow_circle, profil_photo:profil_photo}],
  profileChanged: [Pages.PageProfileChanged, {arrow_circle:arrow_circle, profil_photo:profil_photo}],
  profileChangedPassword: [Pages.PageProfileChangedPassword, {arrow_circle:arrow_circle, profil_photo:profil_photo}],
  modals: [Pages.PageModals],
  error404: [Pages.PageError404],
  error500: [Pages.PageError500],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper("isEqual", function (value1, value2) {
  return value1 == value2;
});

const navigate = (page: string) => {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;
  container.innerHTML = Handlebars.compile(source)(context);
};

document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
