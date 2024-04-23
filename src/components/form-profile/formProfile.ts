import { Block, Props } from "../../core/Block";

export class FormProfile extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile label="Почта" value="pochta@yandex.ru" type="email" name="email" readonly=readonly }}}
    {{{ InputProfile label="Логин" value="ivanivanov" type="login" name="login" readonly=readonly }}}
    {{{ InputProfile label="Имя" value="Иван" type="text" name="first_name" readonly=readonly }}}
    {{{ InputProfile label="Фамилия" value="Иванов" type="text" name="second_name" readonly=readonly }}}
    {{{ InputProfile label="Имя в чате" value="Иван" type="text" name="display_name" readonly=readonly }}}
    {{{ InputProfile label="Телефон" value="+7 (909) 967 30 30" type="tel" name="phone" readonly=readonly }}}
</form>
  `;
  }
}
