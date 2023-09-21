import AboutUsModule from '../../modules/AboutUsModule/AboutUsModule';
import Header from '../../modules/Header/Header';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class AboutUsPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new AboutUsModule().render());

    listenBurger(this.page);
  }
}
