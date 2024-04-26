import { Block, Props } from '../../core/Block';

export class BaseModalContent extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return '<div class="baseModal__content"></div>';
  }
}
