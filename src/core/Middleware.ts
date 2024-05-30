export type Middleware<T> = (context:T, next:()=>void)=>void

export class MiddlewareManager<T=unknown> {
  private stack:Middleware<T>[] = [];

  use(middleware:Middleware<T>) {
    this.stack.push(middleware);
    return this;
  }

  async execute(context: T) {
    let access = !this.stack.length;
    const runner = async (index:number) => {
      if (index === this.stack.length) {
        access = true;
        return;
      }
      const middleware = this.stack[index];
      if (middleware) {
        await middleware(context, () => runner(index + 1));
      }
    };
    if (this.stack.length) await runner(0);
    return access;
  }
}
