import { Block, Props } from "../../core/Block";

export class BaseModalFooter extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return `<footer>
    {{#if default}}
      {{{Button class="primary-button" label=labelButton}}}
    {{/if}}
    {{#if errorFooterText}}
        <p class="error">{{errorFooterText}}</p>
    {{/if}} 
  </footer>`;
  }
}
