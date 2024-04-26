import { Block, Props } from '../../core/Block';

export class Message extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    return `<div class="message">
    {{#if (isEqual type "photo")}}
      <img class="message__element" src="{{value}}" alt="Фото"/>
    {{else}}
      <p class="message__element">{{value}}</p>
    {{/if}}
    <p class="message__time">{{time}}</p>
  </div>`;
  }
}
