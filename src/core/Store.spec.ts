import { expect } from 'chai';
import Store from './Store';

describe('Тестирование Store', () => {
  beforeEach(() => {
    Store.set('test', 'test');
  });

  it('Тестирование set', () => {
    Store.set('test.test2.test3', 'test');
    const obj = Store.getState() as {test:{test2:{test3:string}}};
    expect(obj?.test?.test2?.test3).to.be.eq('test');
  });

  it('Неизменность старого состояния при изменении нового', () => {
    Store.set('test2', 'test2');
    const obj = Store.getState();
    expect(obj.test).to.be.eq('test');
  });
});
