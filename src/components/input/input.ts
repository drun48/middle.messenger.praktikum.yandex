import { Block, Props } from "../../core/Block";

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        input: props.onInput,
      },
    });
    this.element?.dispatchEvent(new Event("input"));
  }
  protected render(): string {
    return `
      <input class="{{class}}" type="{{type}}" style="{{style}}" name="{{name}}" placeholder="{{placeholder}}" autocomplete="on" value="{{value}}"
      {{#if readonly}}
      readonly
      {{/if}}"/>
    `;
  }
}
