import "./style.css";
import Handlebars from "handlebars";
import search from "../../assets/search.svg";
// export { default as InputSearch } from "./index.hbs?raw";
export { InputSearch } from "./inputSearch";

Handlebars.registerHelper("search_img", () => search);
