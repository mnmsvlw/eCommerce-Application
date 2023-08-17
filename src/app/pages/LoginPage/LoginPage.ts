import PageHeader from '../../modules/pageHeader/PageHeader';
import PageLogin from '../../modules/pageLogin/PageLogin';
import Page from '../Page';

export default class LoginPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.appendChild(new PageLogin().render());
  }
}
