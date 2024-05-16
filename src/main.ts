import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import { registerComponent } from './core/registerComponent';
import Router from './core/Router';
import Store from './core/Store';
import { getUser } from './services/auth.ts';

// const pages: Record<
//   string,
//   [string | (new (...args: Props[]) => Block), Props]
// > = {
//   nav: [Pages.NavPage, {}],
//   login: [Pages.LoginPage, {}],
//   signin: [Pages.PageSign, {}],
//   chats: [
//     Pages.PageChats,
//     {
//       attacher,
//       arrowCircle,
//       photoUser,
//     },
//   ],
//   profile: [Pages.PageProfile, { arrowCircle, profilPhoto }],
//   error404: [Pages.PageError, { code: '404', title: 'Не туда попали' }],
//   error500: [Pages.PageError, { code: '500', title: 'Мы уже фиксим' }],
// };

Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') Handlebars.registerPartial(name, component);
  else {
    registerComponent(name, component);
  }
});

Handlebars.registerHelper('isEqual', (value1, value2) => value1 === value2);

Store.set('user', null);
Store.set('auth', null);
Store.set('isLoading', false);

Router.middleware.use(async (ctx, next) => {
  const state = Store.getState();
  if (state.auth === null) {
    await getUser();
  }

  if (state.auth && (ctx.pathname === '/' || ctx.pathname === '/sign-up')) {
    ctx.redirect('/messenger');
    return;
  }

  if (!state.auth && ctx.pathname !== '/' && ctx.pathname !== '/sign-up') {
    ctx.redirect('/');
    return;
  }

  next();
});

Router.use('/', Pages.LoginPage)
  .use('/sign-up', Pages.PageSign)
  .use('/messenger', Pages.PageChats)
  .use('/settings', Pages.PageProfile)
  .use('/error500', Pages.PageError500)
  .use('*', Pages.PageError404)
  .start();
