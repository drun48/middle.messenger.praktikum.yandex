import { Block, Props } from '../../core/Block';
import Router from '../../core/Router';
import { InputForm } from '../input-form';
import {
  validEmpty,
  validLogin,
  validPassword,
} from '../../utils/validator';

export class FormLogin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      validLogin,
      validPassword,
      Login: (event: Event) => this.Login(event),
      goToSignin: (event:Event) => this.goToSignin(event),
    });
  }

  Login(event: Event) {
    event.preventDefault();
    let validForm = true;
    const inputs: Record<string, InputForm> = {
      login: this.refs.login as InputForm,
      password: this.refs.password as InputForm,
    };
    const res: Record<string, string> = {};

    Object.entries(inputs).forEach(([key, item]) => {
      const value = item.value();
      if (typeof value === 'string') {
        res[key] = value;
        const valid = validEmpty(value);
        if (!valid.value) {
          validForm = false;
          inputs[key].setError(valid.errorText);
        }
      } else {
        validForm = false;
      }
    });

    if (this.props.login instanceof Function && validForm) this.props.login(res);
  }

  // eslint-disable-next-line class-methods-use-this
  goToSignin(event:Event) {
    event.preventDefault();
    Router.go('/sign-up');
  }

  protected render() {
    return `
    <div>
    <form class="form-login container-form-modal">
    <div class="container-form-modal__content">    
        <div class="form-login__title">
        <h2>Вход</h2>
        </div>
        <div class="form-login__inputs">
        {{{ InputForm label="Логин" ref="login" name="login" type="email" validate=validLogin}}}
        {{{ InputForm label="Пароль" ref="password" name="password" type="password" validate=validPassword}}}
        </div>
    </div>
    <footer class="form-login__footer">
    {{{Button class="primary-button" label="Авторизоваться" onClick=Login}}}
    {{{Button class="primary-link" label="Нет аккаунта?" onClick=goToSignin}}}
    </footer>
  </form>
  </div>
  `;
  }
}
