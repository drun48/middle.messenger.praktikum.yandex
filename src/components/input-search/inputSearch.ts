import { Block, Props } from "../../core/Block";

export class InputSearch extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    return `<div class="search">
    <label class="search__label">
      {{{ Input type="text" name=name placeholder="" }}}
      <div class="search__label__element">
        <img class="search__label__element__icon" src="{{search_img}}" alt=""/>
        <p class="search__label__element__text">Поиск</p>
      </div>
    </label>
  </div>
  
  
  `;
  }
}
