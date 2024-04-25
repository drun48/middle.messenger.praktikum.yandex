import { Block, Props } from "../../core/Block";
import { Valid } from "../../utils/validator";

export class InputForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        valid: props.valid,
      },
      onBlur: () => this.validate(),
    });
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

  public setError(error: string | undefined) {
    const errorComponent = this.refs.error as Block;
    errorComponent.setProps({ error: error ?? "" });
  }

  private validate() {
    const value = this.getValueInput();
    if (this.props.validate instanceof Function) {
      const valid: Valid = this.props.validate?.(value);
      this.setError(valid.errorText);
      if (valid.value) {
        return false;
      }
    }else{
      this.setError('')
    }
    return true;
  }

  protected render(): string {
    return `<div class="input">
    <label class="input__container">
      {{{ Input ref="input" class="input__element" type=type onBlur=onBlur name=name placeholder="" }}}
      <div class="input__label">{{label}}</div>
      {{{ ErrorInputText ref="error" class="input__text-error" error=error }}}
    </label>
  </div>
  `;
  }
}
