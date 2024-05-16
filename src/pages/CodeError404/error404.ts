import { Block, Props } from '../../core/Block';

export class PageError404 extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    return `
    <div class="container-error">
        {{{ Error code=404 title='Не туда попали' link='/messenger' text_link="Назад к чатам" }}}
    </div>`;
  }
}
