import { Block, Props } from "../../core/Block";

export class InputMessage extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  public getValue() {
    if (!(this.refs.input instanceof Block)) return null;
    const input = this.refs.input.element as HTMLInputElement;
    return input.value;
  }

  protected render(): string {
    return `
    <div class="input-message">
        {{{Input ref="input" class="input-message__element" name="message" placeholder=placeholder }}}
    </div>`;
  }
}
