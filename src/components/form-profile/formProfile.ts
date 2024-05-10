import { Block, Props } from '../../core/Block';
import { maskPhone } from '../../utils/mask';
import { InputProfile } from '../input-profile';
import {
  validName,
  validLogin,
  validEmail,
  validPhone,
  validEmpty,
} from '../../utils/validator';

export class FormProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      maskPhone,
      validName,
      validLogin,
      validEmail,
      validPhone: (value: string) => this.validatePhone(value),
    });
  }

  formatPhone(value: string) {
    return value.replace('(', '').replace(')', '').replaceAll(' ', '');
  }

  validatePhone(value: string) {
    return validPhone(this.formatPhone(value));
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

    const form: Record<string, string> = {};

    let valid = true;

    Object.entries(inputs).forEach(([key, value]) => {
      const val = value.value();
      if (typeof val === 'string') {
        const emptyValid = validEmpty(val);
        if (!emptyValid.value) {
          valid = false;
          value.setError(emptyValid.errorText);
        }
        if (key === 'phone') {
          form[key] = this.formatPhone(val);
        } else {
          form[key] = val;
        }
      } else {
        valid = false;
      }
    });

    return valid ? form : null;
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile ref="email" label="Почта" value=form.email type="email" name="email" readonly=readonly validate=validEmail }}}
    {{{ InputProfile ref="login" label="Логин" value=form.login type="login" name="login" readonly=readonly validate=validLogin}}}
    {{{ InputProfile ref="first_name" label="Имя" value=form.first_name type="text" name="first_name" readonly=readonly validate=validName }}}
    {{{ InputProfile ref="second_name" label="Фамилия" value=form.second_name type="text" name="second_name" readonly=readonly validate=validName }}}
    {{{ InputProfile ref="display_name" label="Имя в чате" value=form.display_name type="text" name="display_name" readonly=readonly validate=validName }}}
    {{{ InputProfile ref="phone" label="Телефон" value=form.phone type="tel" name="phone" readonly=readonly mask=maskPhone validate=validPhone }}}
</form>
  `;
  }
}
