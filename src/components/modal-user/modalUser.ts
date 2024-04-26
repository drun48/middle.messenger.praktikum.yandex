import { Block, Props } from "../../core/Block";

export class ModalUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onClose: () => {
        this.props.open = false;
      },
    });
  }

  open() {
    this.props.open = true;
  }

  close() {
    this.props.open = false;
  }

  protected render(): string {
    return `
    {{#BaseModal title=title class="modal-user" open=open global=global close=onClose}}
    {{#BaseModalContent}}
       <div class="modal-user__content">
          {{{ InputForm label="Логин" type="login" }}}
       </div>
      {{/BaseModalContent}}
      {{{BaseModalFooter default=true labelButton=labelButton errorFooterText=errorFooterText errorTitle=errorTitle}}}
     {{/BaseModal}}`;
  }
}
