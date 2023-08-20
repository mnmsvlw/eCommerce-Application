import PageHeader from '../../modules/pageHeader/PageHeader';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class MainPage extends Page {
  create() {
    this.page.appendChild(new PageHeader().render());
    this.page.innerHTML += 'Main Page';
    listenBurger(this.page);
  }
}
