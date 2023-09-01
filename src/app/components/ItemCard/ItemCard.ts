import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import redirect from '../../utils/redirect';
import Component from '../Component';

export default class ItemCard extends Component {
  render = (name: string, price: string, imgSrc: string, itemId: string) => {
    const cardContainer = new Container('item-card');
    const itemImage = new Image();
    itemImage.src = imgSrc;
    const nameHeading = new Heading(3, 'item-card__name', name).render();
    const priceHeading = new Heading(4, 'item-card__price', price).render();

    cardContainer.addListener('click', () => {
      redirect(`/items/${itemId}`);
    });

    this.content = cardContainer.render();
    this.content.append(itemImage, nameHeading, priceHeading);

    return this.content;
  };
}
