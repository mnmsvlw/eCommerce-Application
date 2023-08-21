import sdkClient from './api/SdkClient';
import Router from './router/Router';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('history');
  }

  init() {
    this.router.start();
    sdkClient.init();
  }
}
