import { Block, Props } from "../../core/Block";

export class ModalDeleteChat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onClose: () => {
        this.props.open = false;
      },
      deleteBtn: () => {
        this.props.open = false
        if (this.props.delete instanceof Function) this.props.delete();
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
          {{/BaseModalFooter}}
      {{/BaseModal}}`;
  }
}
