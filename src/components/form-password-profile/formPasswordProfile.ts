import { Block, Props } from "../../core/Block";
import { valid_password } from "../../utils/validator";
import { InputProfile } from "../input-profile";

export class FormPasswordProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      valid_password,
      validateCopyPassword: (value: string) => this.validateCopyPassword(value),
    });
  }

  validateCopyPassword(value: string) {
    if (!value) {
      return { value: true };
    }
    const password = this.refs.password as InputProfile;
    const passwordValue = password.value();
    if (passwordValue !== null && passwordValue == value) {
      return { value: true };
    }
    return { value: false };
  }

  getForm() {
    const inputs: Record<string, InputProfile> = {
      old_password: this.refs.old_password as InputProfile,
      password: this.refs.password as InputProfile,
      copy_password: this.refs.copy_password as InputProfile,
    };

    let form: Record<string, string> = {};

    for (let item in inputs) {
      const value = inputs[item].value();
      if (!value) return null;
      form[item] = value;
    }

    return form;
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile ref="old_password" label="Старый пароль" type="password" name="oldPassword" validate=valid_password}}}
    {{{ InputProfile ref="password" label="Новый пароль" type="password" name="newPassword" validate=valid_password }}}
    {{{ InputProfile ref="copy_password" label="Повторите новый пароль" type="password" validate=validateCopyPassword }}}
</form>`;
  }
}
