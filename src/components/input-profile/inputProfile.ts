import { Block, Props } from "../../core/Block";

export class InputProfile extends Block {
  constructor(props: Props) {
    super({
      ...props
    });
  }

  protected render() {
    return `<div class="input-profile">
    <label class="input-profile__label">
      {{label}}
      {{{Input class="input-profile__element"
      type=type
      value=value
      name=name
      readonly=readonly }}}        
    </label>
  </div>
  
  `;
  }
}
