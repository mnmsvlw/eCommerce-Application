import { Route } from '../../types/routerTypes';
import sdkClient from '../api/SdkClient';
import { listenersList, resetList } from '../data/listenersList';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import redirect from '../utils/redirect';
import routes from './routes';

export default class Router {
  routes: Route[];

  mode: 'hash' | 'history';

  constructor(mode: 'hash' | 'history') {
    this.routes = routes;
    this.mode = mode;
  }

  start() {
    // window.addEventListener('load', () => {
    //   console.log('1');
    //   this.navigate.bind(this)();
    // });

    window.addEventListener('load', this.navigate.bind(this));

    if (this.mode === 'hash') {
      window.addEventListener('hashchange', () => {
        console.log('2');
        this.navigate.bind(this)();
      });
    } else {
      window.addEventListener('popstate', () => {
        console.log('3');
        this.navigate.bind(this)();
      });
    }
  }

  navigate() {
    let path: string;

    if (this.mode === 'hash') {
      path = window.location.hash.slice(1) || '/';
    } else {
      path = window.location.pathname;
    }

    console.log('navigate', path);
    if (!path.endsWith('/')) path += '/';
    console.log('path', path);
    const route = this.routes.find((r) => r.path.test(path));
    console.log('route', route);

    if (route) {
      this.renderPage(route);
    } else {
      this.render404();
    }
  }

  renderPage(route: Route) {
    const hasAccess =
      !route.accessRules ||
      (route.accessRules?.isForAuthorizedOnly && sdkClient.isAuthorizedUser) ||
      (route.accessRules?.isForUnauthorizedOnly && !sdkClient.isAuthorizedUser);

    document.title = route.title;

    if (hasAccess) {
      const root = document.querySelector('#root') as HTMLElement;
      root.innerHTML = '';
      root.append(route.element().render());
      this.addPageListeners();
    } else {
      redirect(route.redirect as string);
    }
  }

  render404() {
    const root = document.querySelector('#root') as HTMLElement;
    root.innerHTML = '';
    root.appendChild(new NotFoundPage().render());
    this.addPageListeners();
  }

  addPageListeners() {
    listenersList.forEach((listener) => {
      const element = document.getElementById(listener.id) as HTMLElement;
      element.addEventListener(listener.eventType, listener.eventListener);
    });
    resetList();
  }
}
