import Header from '../../modules/Header/Header';
import BasketModule from '../../modules/BasketModule/BasketModule';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class BasketPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new BasketModule().render());
    listenBurger(this.page);
  }
}
