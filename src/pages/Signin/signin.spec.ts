import { expect } from 'chai';
import sinon from 'sinon';
import PageSign from './signin';
import Store from '../../core/Store';

describe('Тестирование страницы PageSign', () => {
  it('Во время ухода страница должна очищать данные', () => {
    const page = new PageSign({});
    const stub = sinon.stub(page, 'setProps');
    page.hide();
    expect(stub.calledWith({ form: {} })).to.be.true;
  });

  it('Стрница должна содержать инпуты(email, login, first_name, second_name, phone, password)', () => {
    const page = new PageSign({});
    const email = page.element?.querySelector('input[name=email]');
    const login = page.element?.querySelector('input[name=login]');
    const firstName = page.element?.querySelector('input[name=first_name]');
    const secondName = page.element?.querySelector('input[name=second_name]');
    const phone = page.element?.querySelector('input[name=phone]');
    const password = page.element?.querySelector('input[name=password]');
    expect(Boolean(false)).to.be.true;
    expect(Boolean(login)).to.be.true;
    expect(Boolean(firstName)).to.be.true;
    expect(Boolean(secondName)).to.be.true;
    expect(Boolean(phone)).to.be.true;
    expect(Boolean(password)).to.be.true;
  });

  it('Страница должна получать ошибку из Store', () => {
    Store.set('signinError', 'test-problem');
    const page = new PageSign({});
    const error = page.element?.getElementsByClassName('error-text')[0];
    expect(error?.textContent).to.be.eq('test-problem');
  });
});
