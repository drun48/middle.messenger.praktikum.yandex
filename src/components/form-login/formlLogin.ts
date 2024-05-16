import { Block, Props } from '../../core/Block';
import { InputForm } from '../input-form';
import {
  validEmpty,
  validLogin,
  validPassword,
} from '../../utils/validator';
import { LoginDTO } from '../../dto/LoginDTO';

export class FormLogin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      validLogin,
      validPassword,
      Login: (event: Event) => this.Login(event),
    });
  }

  Login(event: Event) {
    event.preventDefault();
    let validForm = true;
    const inputs: Record<keyof LoginDTO, InputForm> = {
      login: this.refs.login as InputForm,
      password: this.refs.password as InputForm,
    };
    const res: Partial<LoginDTO> = {};

    Object.entries(inputs).forEach(([key, item]) => {
      const value = item.value();
      if (typeof value === 'string') {
        res[key as keyof LoginDTO] = value;
        const valid = validEmpty(value);
        if (!valid.value) {
          validForm = false;
          inputs[key as keyof LoginDTO].setError(valid.errorText);
        }
      } else {
        validForm = false;
      }
    });

    if (this.props.login instanceof Function && validForm) this.props.login(res as LoginDTO);
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
    {{#RouterLink class="primary-link" to="/sign-up"}}
      <p>Нет аккаунта?</p>
    {{/RouterLink}}
    {{#if error}}
      <p class="error-text">{{error}}</p>
    {{/if}}
    </footer>
  </form>
  </div>
  `;
  }
}
