import { expect } from 'chai';
import Router from './Router';
import * as Pages from '../pages';

describe('Тестирование Router', () => {
  function waitForPopState() {
    return new Promise<void>((resolve) => {
      const handler = () => {
        window.removeEventListener('popstate', handler);
        resolve();
      };
      window.addEventListener('popstate', handler);
    });
  }

  before(() => {
    Router.use('/', Pages.LoginPage)
      .use('/sign-up', Pages.PageSign)
      .use('/messenger', Pages.PageChats)
      .use('/settings', Pages.PageProfile)
      .use('/error500', Pages.PageError500)
      .use('*', Pages.PageError404)
      .start();
  });

  beforeEach(async () => {
    await Router.go('/');
  });

  it('Проверяем переходы у Роута', async () => {
    await Router.go('/');
    await Router.go('/sign-up');
    await Router.go('/error500');
    expect(Router.getCurrentRoute?.match('/error500')).to.be.true;
  });

  it('Проверяем переход назад', async () => {
    await Router.go('/sign-up');
    await Router.go('/settings');
    Router.back();
    await waitForPopState();
    expect(Router.getCurrentRoute?.match('/sign-up')).to.be.true;
  });

  it('Проверяем переход вперед', async () => {
    await Router.go('/sign-up');
    await Router.go('/settings');
    Router.back();
    await waitForPopState();
    Router.forward();
    await waitForPopState();
    expect(Router.getCurrentRoute?.match('/settings')).to.be.true;
  });
});
