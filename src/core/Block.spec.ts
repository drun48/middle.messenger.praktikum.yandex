import { expect } from 'chai';
import sinon from 'sinon';
import { Block, Props } from './Block';
import Router from './Router';

describe('Тестирование Block', () => {
  let PageClass: typeof Block;
  before(() => {
    class Page extends Block {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `<div>
                <span id="test-text">{{text}}</span>
                <button>{{text-button}}</button>
                </div>`;
      }
    }
    PageClass = Page;
    Router.use('/', Page);
  });

  it('Block должен быть реактивным', () => {
    const text = 'new value';
    const pageComponent = new PageClass({ text: 'Hello' });

    pageComponent.setProps({ text });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('Block должен добалвять событие на элемент', () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  });

  it('Block должен отрисовывать верстку в dom', async () => {
    await Router.go('/');
    const element = document.getElementById('test-text');
    expect(Boolean(element)).to.be.true;
  });
});
