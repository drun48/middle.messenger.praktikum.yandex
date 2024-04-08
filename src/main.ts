import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
  nav: [Pages.NavPage],
  login: [Pages.LoginPage],
  signin: [Pages.PageSign],
  listChat: [Pages.ListChat],
  profile: [Pages.PageProfile],
  profileChanged: [Pages.PageProfileChanged],
  profileChangedPassword: [Pages.PageProfileChangedPassword],
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
