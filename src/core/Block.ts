import Handlebars from 'handlebars';
import uuid from 'uuid-random';
import { EventBus } from './EventBus';

export type Props = {
  [key: string]: unknown,
  watch?:Record<string, (newValue?:unknown, oldValue?:unknown) => void>
};

export type Refs = {
  // eslint-disable-next-line no-use-before-define
  [key: string]: Element | Block;
};

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _eventBus: EventBus;

  protected refs: Refs = {} as Refs;

  protected props: Props;

  id: string = uuid();

  get element() {
    return this._element;
  }

  get eventBus() {
    return this._eventBus;
  }

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props: Props) {
    this.props = this.makePropsProxy({ ...props });

    this._eventBus = new EventBus();
    this.registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _init() {
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private makePropsProxy(props: Props) {
    const set = (context: Props, prop: string, value: unknown) => {
      const target = context;
      if (prop[0] === '_') {
        throw new Error('нет доступа');
      }
      const oldTarget = { ...target };
      target[prop] = value;
      this._watch(prop, value, oldTarget[prop]);
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
      return true;
    };
    const get = (target: Props, prop: string) => {
      if (prop[0] === '_') {
        throw new Error('нет доступа');
      }
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    };
    const deleteProperty = () => {
      throw new Error('нет доступа');
    };
    return new Proxy(props, {
      get,
      set,
      deleteProperty,
    });
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._removeEvents();

    this._element = newElement;

    this._addEvents();
  }

  private _watch(prop:string, newValue:unknown, oldValue:unknown) {
    if (this.props.watch?.[prop] instanceof Function) {
      this.props.watch[prop](newValue, oldValue);
    }
  }

  //
  private compile(template: string, context: Props) {
    const contextAndStubs = { ...context, __refs: this.refs, __children: [] };

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
    contextAndStubs.__children?.forEach((item: object) => {
      if ('embed' in item && item.embed instanceof Function) {
        item.embed(temp.content);
      }
    });

    return temp.content;
  }

  private _removeEvents() {
    const { events } = this.props as { events: { [key: string]: () => {} } };
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element instanceof HTMLElement) {
          this._element.removeEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  private _addEvents() {
    const { events } = this.props as { events: { [key: string]: () => {} } };
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element instanceof HTMLElement) {
          this._element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  protected init() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  protected componentDidMount(_oldProps?: Props) {}

  protected dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  protected componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }
    return this.element;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  show() {
    if (this.element instanceof HTMLElement) this.element.style.display = '';
  }

  hide() {
    if (this.element instanceof HTMLElement) this.element.style.display = 'none';
  }
}
