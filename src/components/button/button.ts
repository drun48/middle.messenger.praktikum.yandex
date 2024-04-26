import { Block, Props } from '../../core/Block';

export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): string {
    return `
      <button class="{{class}}" >{{label}}</button>
    `;
  }
}
