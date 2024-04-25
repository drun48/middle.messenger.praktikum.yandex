import { Block, Props } from "../../core/Block";

export class ErrorInputText extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return `<div class="{{class}}" style="{{style}}">{{error}}</div>`;
  }
}
