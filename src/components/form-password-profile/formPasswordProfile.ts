import { Block, Props } from '../../core/Block';
import { Valid, validPassword, validEmpty } from '../../utils/validator';
import { InputProfile } from '../input-profile';

export class FormPasswordProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      validPassword,
      validateCopyPassword: (value: string) => this.validateCopyPassword(value),
    });
  }

  validateCopyPassword(value: string):Valid {
    if (!value) {
      return { value: true };
    }
    const password = this.refs.password as InputProfile;
    const passwordValue = password.value();
    if (passwordValue !== null && passwordValue === value) {
      return { value: true };
    }
    return { value: false, errorText: 'Пароли должны совпадать' };
  }

  getForm() {
    const inputs: Record<string, InputProfile> = {
      oldPassword: this.refs.old_password as InputProfile,
      newPassword: this.refs.password as InputProfile,
      copy_password: this.refs.copy_password as InputProfile,
    };

    const form: Record<string, string> = {};
    let valid = true;

    Object.entries(inputs).forEach(([key, item]) => {
      const value = item.value();
      if (typeof value === 'string') {
        form[key] = value;
        const emptyValid = validEmpty(value);
        if (!emptyValid.value) {
          valid = false;
          item.setError(emptyValid.errorText);
        }
      } else {
        valid = false;
      }
    });

    return valid ? form : null;
  }

  protected render() {
    return `<form class="with-delimetr">
    {{{ InputProfile ref="old_password" label="Старый пароль" type="password" name="oldPassword" validate=validPassword}}}
    {{{ InputProfile ref="password" label="Новый пароль" type="password" name="newPassword" validate=validPassword }}}
    {{{ InputProfile ref="copy_password" label="Повторите новый пароль" type="password" validate=validateCopyPassword }}}
</form>`;
  }
}
