import { Block, Props } from '../../core/Block.ts';
import connect from '../../core/connect.ts';
import { signup } from '../../services/auth.ts';

class PageSign extends Block {
  constructor(props: Props) {
    super({
      ...props,
      signin: (value: Record<string, string>) => {
        this.setProps({ form: value });
        signup(value);
      },
    });
  }

  hide() {
    this.setProps({ form: {} });
    this.setProps({ signinError: '' });
    if (this.element instanceof HTMLElement) this.element.style.display = 'none';
  }

  protected render() {
    return `<div class="container-center">
    {{{ FormSignin signin=signin error=signinError form=form}}}
    </div>`;
  }
}

export default connect(({ isLoading, signinError }) => ({ isLoading, signinError }))(PageSign);
