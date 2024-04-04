import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
  nav: [Pages.NavPage],
  login: [Pages.LoginPage],
  signin: [Pages.PageSign],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
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
