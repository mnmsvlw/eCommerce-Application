import PageHeader from '../../modules/pageHeader/PageHeader';
import PageRegistration from '../../modules/pageRegistration/PageRegistration';
import Page from '../Page';

export default class RegisterPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.appendChild(new PageRegistration().render());
  }
}
