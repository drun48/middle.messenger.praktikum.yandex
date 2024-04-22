import { Block, Props } from "../../core/Block";

export class LoginPageBlock extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }
  protected render() {
    return `
        <div class="container-center" >
          {{{ FormLogin }}}
        </div>
        `;
  }
}
