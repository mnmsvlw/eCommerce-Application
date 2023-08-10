import PageHeader from '../../modules/pageHeader/PageHeader';
import Page from '../Page';

export default class RegisterPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.innerHTML += 'Register Page';
  }
}
