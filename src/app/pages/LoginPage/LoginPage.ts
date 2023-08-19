import Header from '../../modules/Header/Header';
import PageLogin from '../../modules/pageLogin/PageLogin';
import Page from '../Page';

export default class LoginPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new PageLogin().render());
  }
}
