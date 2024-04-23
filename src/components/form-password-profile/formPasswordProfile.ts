import { Block, Props } from "../../core/Block";

export class FormPasswordProfile extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile label="Старый пароль" value="password" type="password" name="oldPassword" }}}
    {{{ InputProfile label="Новый пароль" value="new_password" type="password" name="newPassword" }}}
    {{{ InputProfile label="Повторите новый пароль" value="new_password" type="password" }}}
</form>
  `;
  }
}
