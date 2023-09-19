import Header from '../../modules/Header/Header';
import ProfileModule from '../../modules/ProfileModule/ProfileModule';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class ProfilePage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new ProfileModule().render());
    listenBurger(this.page);
  }
}
