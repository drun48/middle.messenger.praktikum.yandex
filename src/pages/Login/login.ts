import { Block, Props } from '../../core/Block';
import connect from '../../core/connect';

import { login, getUser } from '../../services/auth';

class LoginPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      login: (form: Record<string, string>) => this.login(form),
    });
    getUser();
  }

  // eslint-disable-next-line class-methods-use-this
  login(form: Record<string, string>) {
    console.log(form);
    login({ login: 'string', password: 'string' });
  }

  protected render() {
    return `
        <div class="container-center" >
          {{{ FormLogin login=login}}}
        </div>`;
  }
}

export default connect(({ isLoading, loginError }) => ({ isLoading, loginError }))(LoginPage);
