import Header from '../../modules/Header/Header';
import ProductModule from '../../modules/ProductModule/ProductModule';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class RegisterPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new ProductModule().render());
    listenBurger(this.page);
  }
}
