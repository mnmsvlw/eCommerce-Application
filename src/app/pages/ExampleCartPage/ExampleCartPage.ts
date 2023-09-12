import ExampleCartModule from '../../modules/ExampleCartModule/ExampleCartModule';
import Header from '../../modules/Header/Header';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class ExampleCartPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new ExampleCartModule().render());
    listenBurger(this.page);
  }
}
