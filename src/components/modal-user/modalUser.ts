import { Block, Props } from "../../core/Block";

export class ModalUser extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return `<div class="modal-user">
    {{#BaseModal title=title}}
    {{#BaseModalContent}}
       <div class="modal-user__content">
          {{{ InputForm label="Логин" type="login" }}}
       </div>
      {{/BaseModalContent}}
      {{{BaseModalFooter default=true labelButton=labelButton errorFooterText=errorFooterText errorTitle=errorTitle}}}
     {{/BaseModal}}
   </div>`;
  }
}
