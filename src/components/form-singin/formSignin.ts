import { Block, Props } from '../../core/Block';
import {
  validName,
  validLogin,
  validEmail,
  validPassword,
  validPhone,
  validEmpty,
  Valid,
} from '../../utils/validator';
import { maskPhone } from '../../utils/mask';
import { InputForm } from '../input-form';

export class FormSignin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      validName,
      validLogin,
      validEmail,
      validPassword,
      validPhone: (value: string) => this.validatePhone(value),
      maskPhone,
      validCopyPassword: (value: string) => this.validCopyPassword(value),
      events: {
        signin: props.signin,
      },
      Signin: (event: Event) => this.Signin(event),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  formatPhone(value: string) {
    return value.replace('(', '').replace(')', '').replaceAll(' ', '');
  }

  validatePhone(value: string) {
    return validPhone(this.formatPhone(value));
  }

  validCopyPassword(value: string): Valid {
    if (!value) {
      return { value: true };
    }
    const password = this.refs.password as InputForm;
    const passwordValue = password.value();
    if (passwordValue !== null && passwordValue === value) {
      return { value: true };
    }
    return { value: false, errorText: 'Пароли должны совпадать' };
  }

  Signin(event: Event) {
    event.preventDefault();

    let validForm = true;

    const inputs: Record<string, InputForm> = {
      email: this.refs.email as InputForm,
      login: this.refs.login as InputForm,
      first_name: this.refs.first_name as InputForm,
      second_name: this.refs.second_name as InputForm,
      phone: this.refs.phone as InputForm,
      password: this.refs.password as InputForm,
      copy_password: this.refs.copy_password as InputForm,
    };

    const res: Record<string, string> = {};

    Object.entries(inputs).forEach(([key, value]) => {
      const val = value.value();
      if (typeof val === 'string') {
        res[key] = val;
        const valid = validEmpty(val);
        if (!valid.value) {
          validForm = false;
          inputs[key].setError(valid.errorText);
        }
      } else {
        validForm = false;
      }
    });

    if (this.props.signin instanceof Function && validForm) this.props.signin(res);
  }

  protected render() {
    return `<form class="form-signin container-form-modal">
    <div class="container-form-modal__content">    
        <div class="form-signin__title">
        <h2>Регистрация</h2>
        </div>
        <div class="form-signin__inputs">
        {{{ InputForm ref="email" value=form.email label="Почта" name="email" type="email" validate=validEmail}}}
        {{{ InputForm ref="login" value=form.login label="Логин" name="login" type="login" validate=validLogin}}}
        {{{ InputForm ref="first_name" value=form.first_name label="Имя" name="first_name" type="text" validate=validName}}}
        {{{ InputForm ref="second_name" value=form.second_name label="Фамилия" name="second_name" type="text" validate=validName}}}
        {{{ InputForm ref="phone" value=form.phone label="Телефон" name="phone" type="tel" validate=validPhone  mask=maskPhone}}}
        {{{ InputForm ref="password" value=form.password label="Пароль" name="password" type="password" validate=validPassword}}}
        {{{ InputForm ref="copy_password" value=form.copy_password  label="Пароль (ещё раз)" type="password" validate=validCopyPassword}}}
        </div>
    </div>
    <footer class="form-signin__footer">
      {{{Button class="primary-button" label="Зарегистрироваться" onClick=Signin}}}
      {{#RouterLink class="primary-link" to="/"}}
        <p>Войти</p>
      {{/RouterLink}}
      {{#if error}}
        <p class="error-text">{{error}}</p>
      {{/if}}
    </footer>
  </form>`;
  }
}
