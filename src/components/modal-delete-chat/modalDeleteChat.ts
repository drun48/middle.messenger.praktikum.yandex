import { Block, Props } from "../../core/Block";

export class ModalDeleteChat extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return `<div class="deleteChat">
      {{#BaseModal title='Удалить чат' }}
      {{# BaseModalContent}}
          <div  class="deleteChat__content">
              <p>Вы действительно хотие удалить чат?</p>
          </div>
      {{/BaseModalContent}}
          
          {{#BaseModalFooter }}
           <div class="deleteChat__footer">
                  {{{Button  class="primary-button" label="Отменить"}}}
                  {{{Button  class="primary-button error-btn" label="Удалить"}}}
              </div>
          {{/BaseModalFooter}}
      {{/BaseModal}}
  </div>`;
  }
}
