// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body id="app" ></body>', {
  url: 'http://localhost/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.HTMLElement = global.window.HTMLElement;
global.MouseEvent = global.window.MouseEvent;

(async () => {
  const Components = await import('./src/components');
  const { registerComponent } = await import('./src/core/registerComponent');

  Object.entries(Components).forEach(
    ([componentName, component]) => registerComponent(componentName, component),
  );
})();
