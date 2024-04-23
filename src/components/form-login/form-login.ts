import { Block, Props } from "../../core/Block";

export class FormLogin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      test: () => {
        console.log("fsdfsd");
      },
      events: {
        login: props.login,
      },
    });
  }

  protected render() {
    return `<form class="form-login container-form-modal">
    <div class="container-form-modal__content">    
        <div class="form-login__title">
        <h2>Вход</h2>
        </div>
        <div class="form-login__inputs">
        {{{ InputForm label="Логин" name="login" type="email" error="Неверный логин" onBlur=test }}}
        {{{ InputForm label="Пароль" name="password" type="password" onBlur=test }}}
        </div>
    </div>
    <footer class="form-login__footer">
      {{{Button class="primary-button" label="Авторизоваться"}}}
      <a class="primary-link">Нет аккаунта?</a>
    </footer>
  </form>
  `;
  }
}
