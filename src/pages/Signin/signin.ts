import { Block, Props } from '../../core/Block.ts';

export class PageSign extends Block {
  constructor(props: Props) {
    super({
      ...props,
      signin: (value: Record<string, string>) => {
        // eslint-disable-next-line no-console
        console.log(value);
      },
    });
  }

  protected render() {
    return `<div class="container-center">
    {{{ FormSignin signin=signin}}}
</div>`;
  }
}
