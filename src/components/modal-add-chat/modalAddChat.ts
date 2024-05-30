import { Block, Props } from '../../core/Block';
import { validEmpty } from '../../utils/validator';
import { InputForm } from '../../components/input-form';
import { createChat } from '../../services/chats';
import connect from '../../core/connect';

export class ModalAddChat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      validEmpty,
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

  async click() {
    const input = this.refs.input as InputForm;
    const value = input.value();
    if (value) {
      const access = await createChat(value);
      if (access) {
        this.props.open = false;
      }
    }
  }

  protected render(): string {
    return `
    {{#BaseModal title="Добавить чат" class="modal-user" open=open global=global close=onClose}}
    {{#BaseModalContent}}
       <div class="modal-user__content">
          {{{ InputForm ref="input" label="Название чата" type="login" validate=validEmpty }}}
       </div>
      {{/BaseModalContent}}
      {{{BaseModalFooter default=true labelButton="Добавить чат" errorFooterText=errorCreateChat errorTitle=errorTitle onClick=click}}}
     {{/BaseModal}}`;
  }
}

export default connect<{errorCreateChat:string}>(({ errorCreateChat }) => ({ errorCreateChat }))(ModalAddChat);
