import CatalogModule from '../../modules/CatalogModule/CatalogModule';
import Header from '../../modules/Header/Header';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class CatalogPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new CatalogModule().render());

    if (window.location.pathname.replace(/^\/items\/?/, '')) {
      this.page.innerHTML += ` for ID ${window.location.pathname.replace(/^\/items\/?/, '')}`;
    }

    listenBurger(this.page);
  }
}
