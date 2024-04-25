import { Block, Props } from "../../core/Block";
import { maskPhone } from "../../utils/mask";
import { InputProfile } from "../input-profile";
import {
  valid_name,
  valid_login,
  valid_email,
  valid_phone,
  valid_empty,
} from "../../utils/validator";

export class FormProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      maskPhone,
      valid_name,
      valid_login,
      valid_email,
      valid_empty,
      valid_phone: (value: string) => this.validatePhone(value),
    });
  }

  formatPhone(value: string) {
    return value.replace("(", "").replace(")", "").replaceAll(" ", "");
  }

  validatePhone(value: string) {
    return valid_phone(this.formatPhone(value));
  }

  getForm() {
    const inputs: Record<string, InputProfile> = {
      email: this.refs.email as InputProfile,
      login: this.refs.login as InputProfile,
      first_name: this.refs.first_name as InputProfile,
      second_name: this.refs.second_name as InputProfile,
      display_name: this.refs.display_name as InputProfile,
      phone: this.refs.phone as InputProfile,
    };

    let form: Record<string, string> = {};

    for (let item in inputs) {
      const value = inputs[item].value();
      if (!value) return null;
      if (item == "phone") {
        form[item] = this.formatPhone(value);
      } else {
        form[item] = value;
      }
    }

    return form;
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile ref="email" label="Почта" value=form.email type="email" name="email" readonly=readonly validate=valid_email }}}
    {{{ InputProfile ref="login" label="Логин" value=form.login type="login" name="login" readonly=readonly validate=valid_login}}}
    {{{ InputProfile ref="first_name" label="Имя" value=form.first_name type="text" name="first_name" readonly=readonly validate=valid_name }}}
    {{{ InputProfile ref="second_name" label="Фамилия" value=form.second_name type="text" name="second_name" readonly=readonly validate=valid_name }}}
    {{{ InputProfile ref="display_name" label="Имя в чате" value=form.display_name type="text" name="display_name" readonly=readonly validate=valid_name }}}
    {{{ InputProfile ref="phone" label="Телефон" value=form.phone type="tel" name="phone" readonly=readonly mask=maskPhone validate=valid_phone }}}
</form>
  `;
  }
}
