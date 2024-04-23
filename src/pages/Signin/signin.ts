import { Block, Props } from "../../core/Block";

export class PageSign extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }
  protected render() {
    return `<div class="container-center">
    {{{ FormSignin }}}
</div>`;
  }
}
