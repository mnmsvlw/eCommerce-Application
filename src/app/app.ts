// import MainPage from './pages/MainPage/MainPage';
import sdkClient from './api/SdkClient';
import Router from './router/Router';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('history');
  }

  init() {
    this.router.start();
    this.authorization();
  }

  async authorization() {
    sdkClient.setPasswordFlow('testing1@gmail.com', '12345678Qw!');
    // await authorizationHandler.apiRoot
    //   .me()
    //   .carts()
    //   .post({
    //     body: {
    //       currency: 'EUR',
    //     },
    //   })
    //   .execute();
    await sdkClient.apiRoot.me().activeCart().get().execute();
  }
}
