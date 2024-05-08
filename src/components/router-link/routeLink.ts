import { Block, Props } from '../../core/Block';
import Router from '../../core/Router';

export class RouterLink extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => {
          if (typeof this.props.to === 'string') {
            Router.go(this.props.to);
          }
        },
      },
    });
  }

  protected render(): string {
    return '<a class="{{class}} router-link"></a>';
  }
}
