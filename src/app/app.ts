import sdkClient from './api/SdkClient';
import Router from './router/Router';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('history');
  }

  async init() {
    await sdkClient.init();
    this.router.start();
  }
}
