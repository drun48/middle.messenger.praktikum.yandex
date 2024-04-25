import { Block, Props } from "../../core/Block";
import {
  valid_name,
  valid_login,
  valid_email,
  valid_password,
  valid_phone,
  valid_empty,
  Valid,
} from "../../utils/validator";
import { InputForm } from "../input-form";

export class FormSignin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      valid_name,
      valid_login,
      valid_email,
      valid_password,
      valid_phone,
      valid_empty,
      validCopyPassword: (value: string) => this.validCopyPassword(value),
      events: {
        signin: props.signin,
      },
      Signin: (event: Event) => this.Signin(event),
    });
    if (props.signin instanceof Function)
      this.eventBus.on("signin", props.signin);
  }

  validCopyPassword(value: string): Valid {
    if (!value) {
      return { value: true };
    }
    const password = this.refs.password as InputForm;
    const passwordValue = password.value();
    if (passwordValue !== null && passwordValue == value) {
      return { value: true };
    }
    return { value: true, errorText: "Пароли должны совпадать" };
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

    for (let item in inputs) {
      const value = inputs[item].value();
      if (typeof value == "string") {
        res[item] = value
        const valid = valid_empty(value);
        if (!valid.value) {
          validForm = false;
          inputs[item].setError(valid.errorText);
        }
      } else {
        validForm = false;
      }
    }

    if (this.props.signin instanceof Function && validForm)
      this.eventBus.emit("signin", res);
  }

  protected render() {
    return `<form class="form-signin container-form-modal">
    <div class="container-form-modal__content">    
        <div class="form-signin__title">
        <h2>Регистрация</h2>
        </div>
        <div class="form-signin__inputs">
        {{{ InputForm ref="email" label="Почта" name="email" type="email" validate=valid_email}}}
        {{{ InputForm ref="login" label="Логин" name="login" type="login" validate=valid_login}}}
        {{{ InputForm ref="first_name" label="Имя" name="first_name" type="text" validate=valid_name}}}
        {{{ InputForm ref="second_name" label="Фамилия" name="second_name" type="text" validate=valid_name}}}
        {{{ InputForm ref="phone" label="Телефон" name="phone" type="tel" validate=valid_phone}}}
        {{{ InputForm ref="password" label="Пароль" name="password" type="password" validate=valid_password}}}
        {{{ InputForm ref="copy_password" label="Пароль (ещё раз)" type="password" validate=validCopyPassword}}}
        </div>
    </div>
    <footer class="form-signin__footer">
      {{{Button class="primary-button" label="Зарегистрироваться" onClick=Signin}}}
      <a class="primary-link">Войти</a>
    </footer>
  </form>
  
  `;
  }
}
