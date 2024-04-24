import { Block, Props } from "../../core/Block";

export class InputMessage extends Block {
  constructor(props: Props) {
    console.log(props)
    super({
      ...props,
    });
  }

  protected render(): string {
    return `
    <div class="input-message">
        {{{Input class="input-message__element" name="message" placeholder=placeholder }}}
    </div>`;
  }
}
