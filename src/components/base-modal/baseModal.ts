import { Block, Props } from "../../core/Block";

export class BaseModal extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return `<div class="baseModal container-form-modal">
      <div class="baseModal__title">
          <h2 class="{{#if errorTitle}}error{{/if}}">{{title}}</h2>
      </div>
  </div>`;
  }
}
