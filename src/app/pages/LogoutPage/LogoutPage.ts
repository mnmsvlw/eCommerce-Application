import Header from '../../modules/Header/Header';
import LogoutModule from '../../modules/LogoutModule/LogoutModule';
import Page from '../Page';
import listenBurger from '../helpers/listenBurger';

export default class LogoutPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new LogoutModule().render());
    listenBurger(this.page);
  }
}
