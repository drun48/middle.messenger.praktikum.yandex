import { Block, Props } from '../../core/Block';

export class PageError500 extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    return `
    <div class="container-error">
        {{{ Error code=500 title='Мы уже фиксим' link='/messenger' text_link="Назад к чатам" }}}
    </div>`;
  }
}
