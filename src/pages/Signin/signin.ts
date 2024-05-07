import { Block, Props } from '../../core/Block.ts';
import connect from '../../core/connect.ts';
import { signup } from '../../services/auth.ts';

class PageSign extends Block {
  constructor(props: Props) {
    super({
      ...props,
      signin: (value: Record<string, string>) => {
        signup(value);
      },
    });
  }

  protected render() {
    return `<div class="container-center">
    {{{ FormSignin signin=signin}}}
</div>`;
  }
}

export default connect(({ isLoading, loginError }) => ({ isLoading, loginError }))(PageSign);
