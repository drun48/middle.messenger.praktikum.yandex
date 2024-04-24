import { Block, Props } from "../../core/Block";

export class ModalList extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return `
    {{#BaseModal title=title class="container-form-modal modal-list"}}
            <ul class="modal-list__element">
                {{#each list}}
                    <li class="modal-list__element__item">
                        <img src="{{photo}}" alt="Иконка"/>
                        <p>{{value}}</p>
                    </li>
                {{/each}}
            </ul>
    {{/BaseModal}}`;
  }
}
