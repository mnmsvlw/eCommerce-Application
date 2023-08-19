import Header from '../../modules/Header/Header';
import Page from '../Page';

export default class CatalogPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.innerHTML += 'Catalog Page';

    if (window.location.pathname.replace(/^\/items\/?/, '')) {
      this.page.innerHTML += ` for ID ${window.location.pathname.replace(/^\/items\/?/, '')}`;
    }
  }
}
