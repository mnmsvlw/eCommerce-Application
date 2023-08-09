// import MainPage from './pages/MainPage/MainPage';
import Router from './router/Router';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  init() {
    this.router.start();
  }
}
