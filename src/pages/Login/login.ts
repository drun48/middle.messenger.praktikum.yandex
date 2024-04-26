import { Block, Props } from '../../core/Block';

export class LoginPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      login: (form: Record<string, string>) => this.login(form),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  login(form: Record<string, string>) {
    console.log(form);
  }

  protected render() {
    return `
        <div class="container-center" >
          {{{ FormLogin login=login}}}
        </div>
        `;
  }
}
