import { Route } from '../../types/routerTypes';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import routes from './routes';

export default class Router {
  routes: Route[];

  constructor() {
    this.routes = routes;
  }

  start() {
    window.addEventListener('load', this.navigate.bind(this));
    window.addEventListener('hashchange', this.navigate.bind(this));
  }

  navigate() {
    let path = window.location.hash.slice(1) || '/';
    if (!path.endsWith('/')) path += '/';

    // this.formatLink(path);

    const route = this.routes.find((r) => r.path === path);
    if (route) {
      this.renderPage(route);
    } else {
      this.render404();
    }
  }

  renderPage(route: Route) {
    const root = document.querySelector('#root') as HTMLElement;
    root.innerHTML = '';
    root.append(route.element.render());
  }

  render404() {
    const root = document.querySelector('#root') as HTMLElement;
    root.innerHTML = '';
    root.appendChild(new NotFoundPage().render());
  }

  formatLink(path: string) {
    window.history.replaceState(null, '', window.location.origin + path);
  }
}
