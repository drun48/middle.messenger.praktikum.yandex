import { expect } from 'chai';
import Router from './Router';
import * as Pages from '../pages';

Router.use('/', Pages.LoginPage)
  .use('/sign-up', Pages.PageSign)
  .use('/messenger', Pages.PageChats)
  .use('/settings', Pages.PageProfile)
  .use('/error500', Pages.PageError500)
  .use('*', Pages.PageError404)
  .start();

describe('Проверка Router', () => {
  it('Проверяем переходы у Роута', async () => {
    await Router.go('/');
    await Router.go('/sign-up');
    await Router.go('/error500');
    expect(true).to.eq(Router.getCurrentRoute?.match('/error500'));
  });
});
