import { isEqual } from '../utils/isEqual';
import { render } from '../utils/renderBlock';
import { Block, Props } from './Block';

type PropsRoute = Props & {
  rootQuery:string;
};

export class Route {
  private pathname:string;

  private BlockClass:typeof Block;

  private block:Block|null = null;

  private props;

  constructor(pathname:string, view:typeof Block, props:PropsRoute) {
    this.pathname = pathname;
    this.BlockClass = view;
    this.props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname:string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});
      render(this.props.rootQuery, this.block);
      return;
    }

    this.block.show();
  }
}
