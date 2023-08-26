import Header from '../../modules/Header/Header';
import Link from '../../UI/Link';
import redirect from '../../utils/redirect';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class MainPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    // this.page.innerHTML += 'Main Page';

    const mainLink = new Link('/', '', 'Main page');
    mainLink.addListener('click', (e: Event) => {
      e.preventDefault();
      redirect(mainLink.href);
    });

    const loginLink = new Link('/login/', '', 'Login page');
    loginLink.addListener('click', (e: Event) => {
      e.preventDefault();
      redirect(loginLink.href);
    });

    const registerLink = new Link('/register/', '', 'Register page');
    registerLink.addListener('click', (e: Event) => {
      e.preventDefault();
      redirect(registerLink.href);
    });

    const logoutLink = new Link('/logout/', '', 'Logout page');
    logoutLink.addListener('click', (e: Event) => {
      e.preventDefault();
      redirect(logoutLink.href);
    });

    this.page.append(mainLink.render(), loginLink.render(), registerLink.render(), logoutLink.render());
    listenBurger(this.page);
  }
}
