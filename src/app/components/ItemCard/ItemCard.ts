import './ItemCard.css';
import { Price, ProductProjection } from '@commercetools/platform-sdk';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Component from '../Component';
import ImageElement from '../../UI/Img';

export default class ItemCard extends Component {
  render = (itemInfo: ProductProjection) => {
    this.content = new Container('item-card').render();
    this.content.setAttribute('data-item-id', itemInfo.id);

    const { images } = itemInfo.masterVariant;
    let imgSrc;

    if (images) {
      imgSrc = images[0].url;
    }

    const imgContainer = new Container('item-card__img-container').render();
    const itemImage = new ImageElement(String(imgSrc), String(itemInfo.name['en-US']), 'item-card__image').render();

    const textContainer = new Container('item-card__text-container').render();
    const nameHeading = new Heading(3, 'item-card__name', String(itemInfo.name['en-US'])).render();
    const prices = itemInfo.masterVariant.prices as Price[];
    const priceHeading = new Heading(3, 'item-card__price', `${prices[0].value.centAmount / 100} USD`).render();

    // cardContainer.addListener('click', () => {
    //   redirect(`/items/${itemInfo.id}`);
    // });

    // this.content = cardContainer.render();
    imgContainer.appendChild(itemImage);
    textContainer.append(nameHeading, priceHeading);
    this.content.append(imgContainer, textContainer);

    return this.content;
  };
}
