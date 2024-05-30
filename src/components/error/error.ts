import { Block, Props } from '../../core/Block';

export class Error extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    return `<div class="error-code">
    <h2 class="error-code__elemnt">{{code}}</h2>
    <h3 class="error-code__title">{{title}}</h3>
    {{#RouterLink class="primary-link error-code__link" to=link}}
        {{text_link}}
    {{/RouterLink}}
  </div>
  `;
  }
}
