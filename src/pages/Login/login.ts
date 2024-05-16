import { Block, Props } from '../../core/Block';
import connect from '../../core/connect';
import { LoginDTO } from '../../dto/loginDTO';

import { login } from '../../services/auth';

class LoginPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      login: (form: LoginDTO) => this.login(form),
    });
  }

  login(form: LoginDTO) {
    login(form);
  }

  protected render() {
    return `
      <div class="container-center" >
          {{{ FormLogin login=login error=loginError}}}
      </div>`;
  }
}

export default connect<{loginError:string}>(({ loginError }) => ({ loginError }))(LoginPage);
