import Header from '../../modules/Header/Header';
import LoginModule from '../../modules/LoginModule/LoginModule';
import Page from '../Page';

export default class LoginPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new LoginModule().render());
  }
}
