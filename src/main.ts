import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import arrowCircle from './assets/arrow-circle.svg';
import attacher from './assets/attacher.svg';
import photoUser from './assets/photoUser.png';
import profilPhoto from './assets/profile_photo.svg';
import { Block } from './core/Block';
import { registerComponent } from './core/registerComponent';

const pages = {
  nav: [Pages.NavPage],
  login: [Pages.LoginPage],
  signin: [Pages.PageSign],
  chats: [
    Pages.PageChats,
    {
      attacher,
      arrowCircle,
      photoUser,
    },
  ],
  profile: [
    Pages.PageProfile,
    { arrowCircle, profilPhoto },
  ],
  error404: [Pages.PageError, { code: '404', title: 'Не туда попали' }],
  error500: [Pages.PageError, { code: '500', title: 'Мы уже фиксим' }],
};

Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') Handlebars.registerPartial(name, component);
  else {
    registerComponent(name, component);
  }
});

Handlebars.registerHelper('isEqual', (value1, value2) => value1 === value2);

const navigate = (page: string) => {
  // @ts-ignore
  const [Source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (Source instanceof Object) {
    const element = new Source(context) as Block;
    container.innerHTML = '';
    container.append(element.getContent() as Node);
    return;
  }

  container.innerHTML = Handlebars.compile(Source)(context);
};

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
  // @ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
