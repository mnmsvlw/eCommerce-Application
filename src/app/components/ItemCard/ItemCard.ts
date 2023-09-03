import { Price, ProductProjection } from '@commercetools/platform-sdk';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Component from '../Component';

export default class ItemCard extends Component {
  render = (itemInfo: ProductProjection) => {
    this.content = new Container('item-card').render();
    this.content.setAttribute('data-item-id', itemInfo.id);

    const nameHeading = new Heading(3, 'item-card__name', String(itemInfo.name['en-US'])).render();
    const { images } = itemInfo.masterVariant;
    const itemImage = new Image();

    if (images) {
      itemImage.src = images[0].url;
    }

    const prices = itemInfo.masterVariant.prices as Price[];
    const priceHeading = new Heading(4, 'item-card__price', `$${prices[0].value.centAmount / 100}`).render();

    // cardContainer.addListener('click', () => {
    //   redirect(`/items/${itemInfo.id}`);
    // });

    // this.content = cardContainer.render();
    this.content.append(itemImage, nameHeading, priceHeading);

    return this.content;
  };
}
