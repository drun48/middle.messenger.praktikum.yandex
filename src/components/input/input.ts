import { Block, Props } from "../../core/Block";

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        focus: props.onFocus,
        blur: props.onBlur,
      },
    });
  }
  protected render(): string {
    return `
      <input class="{{class}}" type="{{type}}" style="{{style}}" name="{{name}}" placeholder="" autocomplete="on"/>
    `;
  }
}
