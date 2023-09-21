import sdkClient from './api/SdkClient';
import getActiveCart from './api/cart/getActiveCart';
import Router from './router/Router';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('history');
  }

  async init() {
    await sdkClient.init();

    if (!sdkClient.isAuthorizedUser) {
      sdkClient.setAnonymousSessionFlow();
    }

    sdkClient.activeCart = await getActiveCart();
    this.router.start();
  }
}
