import MainComponent from '../../components/Main/Main';
import Header from '../../modules/Header/Header';
// import Link from '../../UI/Link';
// import redirect from '../../utils/redirect';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class MainPage extends Page {
  create() {
    this.page.appendChild(new Header().render());
    // // this.page.innerHTML += 'Main Page';

    // const mainLink = new Link('/', '', 'Main page');
    // mainLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(mainLink.href);
    // });

    // const loginLink = new Link('/login/', '', 'Login page');
    // loginLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(loginLink.href);
    // });

    // const registerLink = new Link('/register/', '', 'Register page');
    // registerLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(registerLink.href);
    // });

    // const logoutLink = new Link('/logout/', '', 'Logout page');
    // logoutLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(logoutLink.href);
    // });

    // const catalogLink = new Link('/items/', '', 'Catalog page');
    // catalogLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(catalogLink.href);
    // });

    // const productLink = new Link('/items/e77c72b5-258d-4e16-970a-324ed0f2ae16/', '', 'Product page');
    // productLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(productLink.href);
    // });

    // const profileLink = new Link('/profile/', '', 'Profile page');
    // profileLink.addListener('click', (e: Event) => {
    //   e.preventDefault();
    //   redirect(profileLink.href);
    // });

    // this.page.append(
    //   mainLink.render(),
    //   loginLink.render(),
    //   registerLink.render(),
    //   logoutLink.render(),
    //   catalogLink.render(),
    //   productLink.render(),
    //   profileLink.render()
    // );

    this.page.append(new MainComponent().render());
    listenBurger(this.page);
  }
}
