import { Block, Props } from "../../core/Block";
import { Valid } from "../../utils/validator";

export class InputProfile extends Block {
  readonly = false;
  constructor(props: Props) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
    this.readonly = props.readonly as boolean;
  }

  public getValueInput() {
    const component = this.refs.input as Block;
    const input = component.element as HTMLInputElement;
    return input.value;
  }

  public value() {
    if (!this.validate()) {
      return null;
    }
    return this.getValueInput();
  }

  private validate() {
    if (this.readonly) return true;
    if (this.props.validate instanceof Function) {
      const value = this.getValueInput();
      const valid: Valid = this.props.validate?.(value);

      if (!valid.value) this.element?.classList.add("error");
      else this.element?.classList.remove("error");

      return valid.value;
    }
    return true;
  }

  protected render() {
    return `<div class="input-profile">
    <label class="input-profile__label">
      {{label}}
      {{{Input class="input-profile__element"
      ref="input"
      type=type
      value=value
      name=name
      readonly=readonly 
      onBlur=onBlur
      onInput=mask }}}        
    </label>
  </div>
  
  `;
  }
}
