import { Block, Props } from "../../core/Block";

export class InputForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return `<div class="input">
    <label class="input__container">
      {{{ Input class="input__element" type=type onBlur=onBlur name=name placeholder="" }}}
      <div class="input__label">{{label}}</div>
      <div class="input__text-error">{{error}}</div>
    </label>
  </div>
  `;
  }
}
