import PageHeader from '../../modules/pageHeader/PageHeader';
import PageNotFound from '../../modules/pageNotFound/PageNotFound';
import Page from '../Page';

export default class NotFoundPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.appendChild(new PageNotFound().render());
  }
}
