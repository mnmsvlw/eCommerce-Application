import Header from '../../modules/Header/Header';
import PageRegistration from '../../modules/pageRegistration/PageRegistration';
import Page from '../Page';

export default class RegisterPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new PageRegistration().render());
  }
}
