import { Block, Props } from "../../core/Block";
import { valid_login } from "../../utils/validator";
import { InputForm } from "../../components/input-form";

export class ModalUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      valid_login,
      onClose: () => {
        this.props.open = false;
      },
      click: () => this.click(),
    });
  }

  open() {
    this.props.open = true;
  }

  close() {
    this.props.open = false;
  }

  click() {
    const input = this.refs.input as InputForm;
    const value = input.value();
    if (value && this.props.getLogin instanceof Function) {
      this.props.getLogin(value);
      this.props.open = false;
    }
  }

  protected render(): string {
    return `
    {{#BaseModal title=title class="modal-user" open=open global=global close=onClose}}
    {{#BaseModalContent}}
       <div class="modal-user__content">
          {{{ InputForm ref="input" label="Логин" type="login" validate=valid_login }}}
       </div>
      {{/BaseModalContent}}
      {{{BaseModalFooter default=true labelButton=labelButton errorFooterText=errorFooterText errorTitle=errorTitle onClick=click}}}
     {{/BaseModal}}`;
  }
}
