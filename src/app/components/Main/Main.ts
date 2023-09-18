import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Link from '../../UI/Link';
import redirect from '../../utils/redirect';
import Component from '../Component';
import './Main.css';

export default class MainComponent extends Component {
  render = () => {
    this.content = new Container('main-container').render();
    const mainImage = new Container('main-image').render();
    const detailsContainer = new Container('image-details').render();
    const mainHeader = new Heading(1, 'main-header', 'Sneakers are our Passion').render();
    const mainLink = new Link('/items/', 'main-link', 'Shop now');

    const categoryContainer = new Container('main-category-container').render();
    const categoryHeader = new Heading(2, 'category-header', 'Shop by category').render();
    const btnContainer = new Container('main-btn-container').render();
    const menCategory = new Link('/items?categories.id=9e203bae-801d-44b8-8669-6594765cf2fd', 'main-link-cat', 'MEN');
    const womenCategory = new Link(
      '/items?categories.id=e2962327-93ea-455d-87ac-5424e3cbe9ba',
      'main-link-cat',
      'WOMEN'
    );
    [mainLink, menCategory, womenCategory].forEach((cat) => {
      cat.addListener('click', (e: Event) => {
        e.preventDefault();
        const tar = e.target as HTMLElement;
        const path = tar.getAttribute('href') as string;
        redirect(path);
      });
    });

    detailsContainer.append(mainHeader, mainLink.render());
    mainImage.append(detailsContainer);
    btnContainer.append(menCategory.render(), womenCategory.render());

    categoryContainer.append(categoryHeader, btnContainer);

    this.content.append(mainImage, categoryContainer);

    return this.content;
  };
}
