import Header from '../../modules/Header/Header';
import RegistrationModule from '../../modules/RegistrationModule/RegistrationModule';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class RegisterPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new RegistrationModule().render());
    listenBurger(this.page);
  }
}
