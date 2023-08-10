import PageHeader from '../../modules/pageHeader/PageHeader';
import Page from '../Page';

export default class NotFoundPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.innerHTML += '404 Page';
  }
}
