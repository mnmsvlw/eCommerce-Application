import './ItemCard.css';
import { LocalizedString, Price, ProductProjection } from '@commercetools/platform-sdk';
import Container from '../../UI/Container';
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
    const metaTitle = itemInfo.metaTitle as LocalizedString;
    const metaDescription = itemInfo.metaDescription as LocalizedString;
    const nameHeading = new Container('item-card__name', String(metaTitle['en-US'])).render();
    const description = new Container('item-card__description', String(metaDescription['en-US'])).render();
    const prices = itemInfo.masterVariant.prices as Price[];
    const priceContainer = new Container('item-card__price').render();
    const priceHeading = new Container('item-card__price-current', `${prices[0].value.centAmount / 100} USD`).render();

    if (prices[0].discounted) {
      const discountedHeading = new Container(
        'item-card__price-discount',
        `${prices[0].discounted.value.centAmount / 100} USD`
      ).render();
      const discountAmount = new Container(
        'item-card__price-discount-amount',
        `-${Math.ceil((1 - prices[0].discounted.value.centAmount / prices[0].value.centAmount) * 100)}% off`
      ).render();
      discountedHeading.appendChild(discountAmount);
      priceContainer.appendChild(discountedHeading);
    }

    priceContainer.appendChild(priceHeading);
    imgContainer.appendChild(itemImage);
    textContainer.append(nameHeading, description, priceContainer);
    this.content.append(imgContainer, textContainer);

    return this.content;
  };
}
