import PageHeader from '../../modules/pageHeader/PageHeader';
import PageLogout from '../../modules/pageLogin/PageLogout';
import Page from '../Page';

export default class LogoutPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.appendChild(new PageLogout().render());
  }
}
