import { Block, Props } from "../../core/Block";

export class FormSignin extends Block {
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
    return `<form class="form-signin container-form-modal">
    <div class="container-form-modal__content">    
        <div class="form-signin__title">
        <h2>Регистрация</h2>
        </div>
        <div class="form-signin__inputs">
        {{{ InputForm label="Почта" name="email" type="email" }}}
        {{{ InputForm label="Логин" name="login" type="login" }}}
        {{{ InputForm label="Имя" name="first_name" type="text" }}}
        {{{ InputForm label="Фамилия" name="second_name" type="text" }}}
        {{{ InputForm label="Телефон" name="phone" type="tel" }}}
        {{{ InputForm label="Пароль" name="password" type="password" }}}
        {{{ InputForm label="Пароль (ещё раз)" type="password" }}}
        </div>
    </div>
    <footer class="form-signin__footer">
      <button class="primary-button">Зарегистрироваться</button>
      <a class="primary-link">Войти</a>
    </footer>
  </form>
  
  `;
  }
}
