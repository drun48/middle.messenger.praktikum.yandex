import "./style.css";
import Handlebars from "handlebars";
import search from "../../assets/search.svg";
export { default as InputSearch } from "./index.hbs?raw";

Handlebars.registerHelper("search_img", () => search);
