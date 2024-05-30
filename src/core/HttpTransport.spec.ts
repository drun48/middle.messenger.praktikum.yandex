/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './HttpTransport';

describe('Тестирование HTTPTransport', () => {
  let open: sinon.SinonSpy;
  let send: sinon.SinonSpy;
  let setRequestHeader: sinon.SinonSpy;
  let headerReqest:Record<string, unknown> = {};
  before(() => {
    open = sinon.fake();
    send = sinon.fake();
    setRequestHeader = sinon.fake((key, value) => {
      headerReqest[key] = value;
    });

    global.XMLHttpRequest = function () {
      return {
        open,
        send,
        setRequestHeader,
      };
    } as any;
  });

  beforeEach(() => {
    headerReqest = {};
  });
  it('HTTPTransport должен открывать соединение и отправлять запрос', () => {
    const http = new HTTPTransport('http://test');
    http.GET('/test');
    expect(open.calledOnce).to.be.true;
    expect(send.calledOnce).to.be.true;
  });

  it('HTTPTransport должен объединять заголовки', () => {
    const http = new HTTPTransport('http://test', { option1: 'options1' });
    http.GET('/test', { headers: { option2: 'options2' } });
    expect(headerReqest.option1).to.be.eq('options1');
    expect(headerReqest.option2).to.be.eq('options2');
  });
});
