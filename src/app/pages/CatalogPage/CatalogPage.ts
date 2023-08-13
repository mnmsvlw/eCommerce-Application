import PageHeader from '../../modules/pageHeader/PageHeader';
import Page from '../Page';

export default class CatalogPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.innerHTML += 'Catalog Page';
    if (window.location.pathname.replace('/items/', '')) {
      this.page.innerHTML += ` for ID ${window.location.pathname.replace('/items/', '')}`;
    }
  }
}
