import Header from '../../modules/Header/Header';
import Page from '../Page';

export default class MainPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    this.page.innerHTML += 'Main Page';
  }
}
