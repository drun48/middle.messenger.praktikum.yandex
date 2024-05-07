import { Block } from './Block';
import { MiddlewareManager } from './Middleware';
import { Route } from './Route';

class Router {
  private routes:Record<string, Route> = {};

  private history: History = window.history;

  private currentRoute:Route|null = null;

  private rootQuery:string;

  // eslint-disable-next-line max-len
  private _middleware:MiddlewareManager<{redirect:(pathname:string)=>void, pathname:string}> = new MiddlewareManager();

  get middleware() {
    return this._middleware;
  }

  constructor(rootQuery:string) {
    this.rootQuery = rootQuery;
  }

  use(pathname:string, block:typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });
    this.routes[pathname] = route;
    return this;
  }

  start() {
    window.onpopstate = () => {
      this.onRoute(window.location.pathname);
    };
    this.onRoute(window.location.pathname);
  }

  private async onRoute(pathname:string) {
    const route = this.getRoute(pathname);

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }
    const access = await this.middleware.execute({ redirect: this.go, pathname });
    if (access) {
      this.currentRoute = route;
      route.render();
    }
  }

  go(pathname:string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname:string):Route {
    return this.routes[pathname] ?? this.routes['/'];
  }
}

export default new Router('#app');
