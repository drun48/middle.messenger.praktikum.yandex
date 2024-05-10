import { Block, Props } from '../../core/Block';
import connect from '../../core/connect';

import { login } from '../../services/auth';

class LoginPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      login: (form: Record<string, string>) => this.login(form),
    });
  }

  login(form: Record<string, string>) {
    login(form);
  }

  protected render() {
    return `
      <div class="container-center" >
          {{{ FormLogin login=login error=loginError}}}
      </div>`;
  }
}

export default connect(({ isLoading, loginError }) => ({ isLoading, loginError }))(LoginPage);
