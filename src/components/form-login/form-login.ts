import { Block, Props } from "../../core/Block";
import { InputForm } from "../input-form";
import { valid_empty } from "../../utils/validator";

export class FormLogin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      Login: (event: Event) => this.Login(event),
    });
    if (props.login instanceof Function) this.eventBus.on("login", props.login);
  }

  Login(event: Event) {
    event.preventDefault();

    let validForm = true;
    const inputs: Record<string, InputForm> = {
      login: this.refs.login as InputForm,
      password: this.refs.password as InputForm,
    };
    const res: Record<string, string> = {};

    for (let item in inputs) {
      const value = inputs[item].value();
      if (typeof value == "string") {
        const valid = valid_empty(value);
        if (!valid.value) {
          validForm = false;
          inputs[item].setError(valid.errorText);
        }
      } else {
        validForm = false;
      }
    }

    if (this.props.login instanceof Function && validForm)
      this.eventBus.emit("login", res);
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
        {{{ InputForm label="Логин" ref="login" name="login" type="email" }}}
        {{{ InputForm label="Пароль" ref="password" name="password" type="password" }}}
        </div>
    </div>
    <footer class="form-login__footer">
    {{{Button class="primary-button" label="Авторизоваться" onClick=Login}}}
    <a class="primary-link">Нет аккаунта?</a>
    </footer>
  </form>
  </div>
  `;
  }
}
