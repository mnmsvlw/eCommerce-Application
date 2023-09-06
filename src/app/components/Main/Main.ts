import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Link from '../../UI/Link';
import Component from '../Component';
import './Main.css';

export default class MainComponent extends Component {
  render = () => {
    this.content = new Container('main-container').render();
    const mainImage = new Container('main-image').render();
    const detailsContainer = new Container('image-details').render();
    const mainHeader = new Heading(1, 'main-header', 'Sneakers are our Passion').render();
    const mainLink = new Link('/items/', 'main-link', 'Shop now').render();
    detailsContainer.append(mainHeader, mainLink);
    mainImage.append(detailsContainer);

    // const categoryContainer = new Container('main-category-container').render();
    // const categoryHeader = new Heading(2, 'category-header', 'Shop by category').render();
    // const btnContainer = new Container('main-btn-container').render();
    // const menCategory = new Link('/items/', 'main-link-cat', 'MEN').render();
    // const womenCategory = new Link('/items/', 'main-link-cat', 'WOMEN').render();
    // btnContainer.append(menCategory, womenCategory);

    // categoryContainer.append(categoryHeader, btnContainer);

    this.content.append(mainImage);

    return this.content;
  };
}
