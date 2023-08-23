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
    if (this.mode === 'hash') {
      window.addEventListener('hashchange', this.navigate);
    } else {
      window.addEventListener('popstate', this.navigate);
    }

    if (document.readyState === 'complete') {
      this.navigate();
    } else {
      window.addEventListener('load', this.navigate);
    }
  }

  navigate = () => {
    let path: string;

    if (this.mode === 'hash') {
      path = window.location.hash.slice(1) || '/';
    } else {
      path = window.location.pathname;
    }

    if (!path.endsWith('/')) path += '/';

    const route = this.routes.find((r) => r.path.test(path));

    if (route) {
      this.renderPage(route);
    } else {
      this.render404();
    }
  };

  renderPage(route: Route) {
    const hasAccess =
      !route.accessRules ||
      (route.accessRules?.isForAuthorizedOnly && sdkClient.isAuthorizedUser) ||
      (route.accessRules?.isForUnauthorizedOnly && !sdkClient.isAuthorizedUser);

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
