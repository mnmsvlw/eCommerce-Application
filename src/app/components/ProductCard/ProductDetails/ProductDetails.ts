import Container from '../../../UI/Container';
import type { ProductResponse } from '../../../../types/productTypes';
import Heading from '../../../UI/Heading';
import Component from '../../Component';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';

export default class ProductDetails extends Component {
  product: ProductResponse;

  constructor(data: ProductResponse) {
    super();
    this.product = data;
  }

  render = () => {
    this.content = new Container('product-card__details-container').render();
    const productName = new Heading(2, 'product-card__header', `${this.product.productName}`).render();
    const productModel = new Heading(3, 'product-card__model', `${this.product.productModel}`).render();
    const productPrice = new Container('product-card__price').render();
    productPrice.textContent = `${this.product.productPrice}`;

    const btnContainer = new Container('product-card__btn-container').render();

    const quantatyBtn = new Container('quantity-container').render();
    const minusBtn = new Button('-', 'button', 'minus-btn').render();
    const quantatyInput = new Input('quantatyInput', 2, 'quantity-input', '1', 'number').render();
    const plusBtn = new Button('+', 'button', 'plus-btn').render();
    quantatyBtn.append(minusBtn, quantatyInput, plusBtn);

    const addToBasketBtn = new Button('Add To Cart', 'button', 'add-to-basket__button').render();

    btnContainer.append(quantatyBtn, addToBasketBtn);

    const descriptionHeader = new Heading(3, 'product-card__description-header', 'Description').render();
    const productDescription = new Container('product-card__description').render();

    this.content.append(productName, productModel, productPrice, btnContainer, descriptionHeader, productDescription);
    this.addListeners();
    return this.content;
  };

  private addListeners = () => {
    const plusBtn = document.querySelector('.plus-btn') as HTMLButtonElement;
    const minusBtn = document.querySelector('.minus-btn') as HTMLButtonElement;
    const quantityInput = document.querySelector('.quantity-input') as HTMLInputElement;

    plusBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value, 10);
      quantityInput.value = (currentValue + 1).toString();
    });

    minusBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value, 10);

      if (currentValue > 1) {
        quantityInput.value = (currentValue - 1).toString();
      }
    });
  };
}
