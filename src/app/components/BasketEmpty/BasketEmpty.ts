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

    this.content.append(title, catalogBox);

    return this.content;
  };
}
