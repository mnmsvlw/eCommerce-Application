import PageHeader from '../../modules/pageHeader/PageHeader';
import Page from '../Page';

export default class ProfilePage extends Page {
  constructor() {
    super();
    this.createPage();
  }

  createPage() {
    this.page.appendChild(new PageHeader().render());
    this.page.innerHTML += 'Profile Page';
  }
}
