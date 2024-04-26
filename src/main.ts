import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import arrow_circle from "./assets/arrow-circle.svg";
import attacher from "./assets/attacher.svg";
import photo_user from "./assets/photoUser.png";
import profil_photo from "./assets/profile_photo.svg";
import { Block } from "./core/Block";
import { registerComponent } from "./core/registerComponent";

const pages = {
  nav: [Pages.NavPage],
  login: [Pages.LoginPage],
  signin: [Pages.PageSign],
  chats: [
    Pages.PageChats,
    {
      attacher: attacher,
      arrow_circle: arrow_circle,
      photo_user: photo_user,
    },
  ],
  profile: [
    Pages.PageProfile,
    { arrow_circle: arrow_circle, profil_photo: profil_photo },
  ],
  error404: [Pages.PageError, { code: "404", title: "Не туда попали" }],
  error500: [Pages.PageError, { code: "500", title: "Мы уже фиксим" }],
};

Object.entries(Components).forEach(([name, component]) => {
  if (typeof component == "string") Handlebars.registerPartial(name, component);
  else {
    registerComponent(name, component);
  }
});

Handlebars.registerHelper("isEqual", function (value1, value2) {
  return value1 == value2;
});

const navigate = (page: string) => {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;

  if (source instanceof Object) {
    const page = new source(context) as Block;
    container.innerHTML = "";
    container.append(page.getContent() as Node);
    return;
  }

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
