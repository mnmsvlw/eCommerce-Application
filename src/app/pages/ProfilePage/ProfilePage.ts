import Header from '../../modules/Header/Header';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class ProfilePage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.innerHTML += 'Profile Page';
    listenBurger(this.page);
  }
}
