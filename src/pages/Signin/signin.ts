import { Block, Props } from "../../core/Block";

export class PageSign extends Block {
  constructor(props: Props) {
    super({
      ...props,
      signin: (value: Record<string, string>) => {
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
