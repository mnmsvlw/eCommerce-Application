import Header from '../../modules/Header/Header';
import PageNotFound from '../../modules/NotFoundModule/NotFoundModule';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class NotFoundPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new PageNotFound().render());
    listenBurger(this.page);
  }
}
