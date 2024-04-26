import { Block, Props } from "../../core/Block";

export class ModalList extends Block {
  constructor(props: Props) {
    super({
      ...props,
      open: false,
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

  getState() {
    return this.props.open;
  }

  protected render(): string {
    return `
    {{#BaseModal class=class title=title class="container-form-modal modal-list" open=open global=global close=onClose}}
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
