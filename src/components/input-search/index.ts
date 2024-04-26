import "./style.css";
import Handlebars from "handlebars";
import search from "../../assets/search.svg";
export { InputSearch } from "./inputSearch";

Handlebars.registerHelper("search_img", () => search);
