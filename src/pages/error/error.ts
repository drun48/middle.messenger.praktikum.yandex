import { Block, Props } from "../../core/Block";

export class PageError extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }
  protected render() {
    return `
    <div class="container-error">
        {{{ Error code=code title=title text_link="Назад к чатам" }}}
    </div>`;
  }
}
