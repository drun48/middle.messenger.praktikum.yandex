import { Block, Props } from '../../core/Block';
import { validPassword } from '../../utils/validator';
import { InputProfile } from '../input-profile';

export class FormPasswordProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      validPassword,
      validateCopyPassword: (value: string) => this.validateCopyPassword(value),
    });
  }

  validateCopyPassword(value: string) {
    if (!value) {
      return { value: true };
    }
    const password = this.refs.password as InputProfile;
    const passwordValue = password.value();
    if (passwordValue !== null && passwordValue === value) {
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

    const form: Record<string, string> = {};

    Object.entries(inputs).forEach(([key, item]) => {
      const value = item.value();
      if (value) {
        form[key] = value;
      }
    });

    return form;
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile ref="old_password" label="Старый пароль" type="password" name="oldPassword" validate=validPassword}}}
    {{{ InputProfile ref="password" label="Новый пароль" type="password" name="newPassword" validate=validPassword }}}
    {{{ InputProfile ref="copy_password" label="Повторите новый пароль" type="password" validate=validateCopyPassword }}}
</form>`;
  }
}
