import Header from '../../modules/Header/Header';
import PageLogout from '../../modules/pageLogin/PageLogout';
import Page from '../Page';

export default class LogoutPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new PageLogout().render());
  }
}
