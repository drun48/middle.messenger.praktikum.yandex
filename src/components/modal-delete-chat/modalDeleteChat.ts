import { Block, Props } from '../../core/Block';
import connect from '../../core/connect';
import { clearError, deleteChact, ErrorsChats } from '../../services/chats';

export class ModalDeleteChat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onClose: () => {
        this.close();
      },
      deleteBtn: async () => {
        const access = await deleteChact({ chatId: this.props.id });
        if (access) {
          this.close();
        }
      },
    });
  }

  open() {
    this.props.open = true;
  }

  close() {
    clearError(ErrorsChats.errorDeleteChat);
    this.props.open = false;
  }

  protected render(): string {
    return `{{#BaseModal title='Удалить чат' class="deleteChat" open=open global=global close=onClose}}
      {{# BaseModalContent}}
          <div  class="deleteChat__content">
              <p>Вы действительно хотие удалить чат?</p>
          </div>
      {{/BaseModalContent}}
          
          {{#BaseModalFooter }}
           <div class="deleteChat__footer">
                {{{Button class="primary-button" label="Отменить" onClick=onClose}}}
                {{{Button class="primary-button error-btn" label="Удалить" onClick=deleteBtn}}}
            </div>
            {{#if errorDeleteChat}}
              <p class="error-text" style="margin:10px;">{{errorDeleteChat}}</p>
            {{/if}}
          {{/BaseModalFooter}}
      {{/BaseModal}}`;
  }
}
export default connect<{errorDeleteChat:string}>(({ errorDeleteChat }) => ({ errorDeleteChat }))(ModalDeleteChat);
