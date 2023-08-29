import Container from '../../../UI/Container';
import type { ProductResponse } from '../../../../types/productTypes';
import Heading from '../../../UI/Heading';
import Component from '../../Component';
import Button from '../../../UI/Button';
import './ProductDetails.css';
import ElementCreator from '../../../utils/ElementCreator';

export default class ProductDetails extends Component {
  product: ProductResponse | null;

  constructor(data?: ProductResponse) {
    super();
    this.product = data || null;
  }

  render = () => {
    this.content = new Container('product-card__details-container').render();

    const productName = new Heading(2, 'product-card__header', `${this.product?.productName || 'Converse'}`).render();

    const productModel = new Heading(
      3,
      'product-card__model',
      `${this.product?.productModel || 'Model “All star” black'}`
    ).render();

    const productPrice = new Container('product-card__price').render();
    const productPriceValid = new Container('product-card__price-valid').render();
    productPriceValid.textContent = `$${this.product?.productPrice || '70.00'}`;
    const productPriceUnvalid = new Container('product-card__price-unvalid').render();
    productPriceUnvalid.textContent = `$${this.product?.productPrice || '100.00'}`;
    const discountPersantage = new Container('product-card__price-discount').render();
    discountPersantage.textContent = `- ${this.product?.discountPercentage || '30.00'}% Off`;
    productPrice.append(productPriceValid, productPriceUnvalid, discountPersantage);

    const btnContainer = new Container('product-card__btn-container').render();
    const quantatyBtn = new Container('quantity-container').render();
    const minusBtn = new Button('-', 'button', 'minus-btn');
    const minusBtnElement = minusBtn.render();
    const quantatyNum = new Container('quantity-input').render();
    quantatyNum.textContent = '1';
    const plusBtn = new Button('+', 'button', 'plus-btn');
    const plusBtnElement = plusBtn.render();
    quantatyBtn.append(minusBtnElement, quantatyNum, plusBtnElement);

    minusBtn.addListener('click', () => {
      const currentValue = parseInt(quantatyNum.textContent || '1', 10);

      if (currentValue > 1) {
        quantatyNum.textContent = (currentValue - 1).toString();
        console.log('minus button');
      }
    });

    plusBtn.addListener('click', () => {
      const currentValue = parseInt(quantatyNum.textContent || '1', 10);
      quantatyNum.textContent = (currentValue + 1).toString();
      console.log('plus button');
    });

    const addToBasketBtn = new Button('Add To Cart', 'button', 'add-to-basket__button').render();

    btnContainer.append(quantatyBtn, addToBasketBtn);

    const descriptionHeader = new Heading(3, 'product-card__description-header', 'Description').render();
    const productDescription = new ElementCreator({
      tag: 'p',
      classNames: 'product-card__description',
      text: `${
        this.product?.productDescription ||
        'BlablaBla blaBlabla BlablaBlab laBlablaBlabla BlablaBlabla BlablaBla blaBlabla BlablaBlabla'
      }`,
    }).getElement();

    this.content.append(productName, productModel, productPrice, btnContainer, descriptionHeader, productDescription);
    return this.content;
  };
}
