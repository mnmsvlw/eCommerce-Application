import { ProductProjection } from '@commercetools/platform-sdk';
import ElementCreator from '../../../utils/ElementCreator';
import Container from '../../../UI/Container';
import Heading from '../../../UI/Heading';
import Component from '../../Component';
import Button from '../../../UI/Button';
import './ProductDetails.css';

export default class ProductDetails extends Component {
  product: ProductProjection;

  constructor(data: ProductProjection) {
    super();
    this.product = data;
  }

  render = () => {
    this.content = new Container('product-card__details-container').render();

    const productName = new Heading(2, 'product-card__header', `${this.product.name?.['en-US']}`).render();

    const productPrice = new Container('product-card__price').render();
    const productPriceValid = new Container('product-card__price-valid').render();

    // if (this.product.masterVariant.price?.discounted?.discount) {
    //   productPriceValid.textContent = `$${this.product.masterVariant.price.discounted.value}`;
    //   const productPriceUnvalid = new Container('product-card__price-unvalid').render();
    //   productPriceUnvalid.textContent = `$${this.product.masterVariant.price.value}`;
    //   const discountPersantage = new Container('product-card__price-discount').render();
    //   discountPersantage.textContent = `- ${this.product.masterVariant.price.discounted.value}% Off`;
    //   productPrice.append(productPriceValid, productPriceUnvalid, discountPersantage);
    // } else {
    const masterVariantPrice = this.product.masterVariant?.prices;

    if (masterVariantPrice && masterVariantPrice[0]?.value) {
      const amount = masterVariantPrice[0].value.centAmount.toString().slice(0, -2);
      const cents = masterVariantPrice[0].value.centAmount.toString().slice(-2);
      productPriceValid.textContent = `$${amount}.${cents}`;
      productPrice.append(productPriceValid);
    } else {
      productPriceValid.textContent = `$${100}.00`;
      productPrice.append(productPriceValid);
    }
    // }

    const btnContainer = new Container('product-card__btn-container').render();
    const quantatyBtn = new Container('quantity-container').render();
    const minusBtn = new Button('-', 'button', 'minus-btn');
    const minusBtnElement = minusBtn.render();
    const quantatyNum = new Container('quantity-num').render();
    quantatyNum.textContent = '1';
    const plusBtn = new Button('+', 'button', 'plus-btn');
    const plusBtnElement = plusBtn.render();
    quantatyBtn.append(minusBtnElement, quantatyNum, plusBtnElement);

    // const minusHandler = () => {
    //   const currentValue = parseInt(quantatyNum.textContent || '1', 10);

    //   if (currentValue > 1) {
    //     quantatyNum.textContent = (currentValue - 1).toString();
    //     console.log('minus button');
    //   }
    // };

    // const plusHandler = () => {
    //   const currentValue = parseInt(quantatyNum.textContent || '1', 10);
    //   quantatyNum.textContent = (currentValue + 1).toString();
    //   console.log('plus button');
    // };

    // minusBtn.addListener('click', minusHandler);
    // plusBtn.addListener('click', plusHandler);

    const addToBasketBtn = new Button('Add To Cart', 'button', 'add-to-basket__button').render();

    btnContainer.append(quantatyBtn, addToBasketBtn);

    const descriptionHeader = new Heading(3, 'product-card__description-header', 'Description').render();
    const productDescription = new ElementCreator({
      tag: 'p',
      classNames: 'product-card__description',
      text: `${
        this.product.description?.['en-US'] || 'Best sneakers with logos are debossed in black on the heel wrap'
      }`,
    }).getElement();

    this.content.append(productName, productPrice, btnContainer, descriptionHeader, productDescription);

    return this.content;
  };
}
