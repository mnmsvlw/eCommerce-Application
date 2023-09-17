import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Link from '../../UI/Link';
import Component from '../Component';
import './BasketEmpty.css';

export default class BasketEmpty extends Component {
  render = () => {
    this.content = new Container('empty-container').render();
    const title = new Heading(2, 'empty-title', 'The basket is empty').render();
    const catalogBox = new Container('emptyBox').render();
    const textCatalog = new Container('empty-text', 'Browse the catalog to find everything you need.').render();
    const linkCatalog = new Link('/items/', 'link-empty', 'Catalog').render();
    catalogBox.append(textCatalog, linkCatalog);
    const loginBox = new Container('emptyBox').render();
    const textLogin = new Container(
      'empty-text',
      'If there were products in the basket, log in to view the list.'
    ).render();
    const linkLogin = new Link('/login/', 'link-empty', 'Log In').render();
    loginBox.append(textLogin, linkLogin);
    this.content.append(title, catalogBox, loginBox);

    return this.content;
  };
}
