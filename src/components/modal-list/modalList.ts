import { Block, Props } from "../../core/Block";

export class ModalList extends Block {
  constructor(props: Props) {
    super({
      ...props,
      open: false,
      onClose: () => {
        this.props.open = false;
      },
      click: (event: Event) => {
        const element = event.currentTarget as HTMLElement;
        const valueElement = element.getElementsByTagName("p")[0];
        const value = valueElement.textContent;
        if (value && this.props.controller instanceof Function) {
          this.props.controller(value);
          this.props.open = false;
        }
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
                        {{#Button class="modal-list__element__item" onClick=../this.click }}
                          <img src="{{photo}}" alt="Иконка"/>
                          <p>{{value}}</p>
                        {{/Button}}
                    </li>
                {{/each}}
            </ul>
    {{/BaseModal}}`;
  }
}
