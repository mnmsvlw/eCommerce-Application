import { ProductProjection } from '@commercetools/platform-sdk';
import ElementCreator from '../../../utils/ElementCreator';
import Container from '../../../UI/Container';
import Heading from '../../../UI/Heading';
import Component from '../../Component';
import Button from '../../../UI/Button';
import './ProductDetails.css';
import Input from '../../../UI/Input';
import Label from '../../../UI/Label';
import { SizeValue } from '../../../../types/productTypes';

export default class ProductDetails extends Component {
  product: ProductProjection;

  productInCart: boolean;

  constructor(data: ProductProjection, productInCart: boolean) {
    super();
    this.product = data;
    this.productInCart = productInCart;
  }

  render = () => {
    this.content = new Container('product-card__details-container').render();

    const productName = new Heading(2, 'product-card__header', `${this.product.name?.['en-US']}`).render();

    const productPrice = new Container('product-card__price').render();
    const productPriceValid = new Container('product-card__price-valid').render();
    const masterVariantPrice = this.product.masterVariant.prices;

    if (masterVariantPrice && masterVariantPrice.length > 0) {
      const price = masterVariantPrice[0]?.value.centAmount.toString().slice(0, -2);
      const discountedPrice = masterVariantPrice[0]?.discounted?.value.centAmount.toString().slice(0, -2);

      if (discountedPrice) {
        const discount = (((+price - +discountedPrice) / +price) * 100).toFixed(0);
        productPriceValid.textContent = `$${discountedPrice} USD`;
        const productPriceUnvalid = new Container('product-card__price-unvalid').render();
        productPriceUnvalid.textContent = `$${price} USD`;
        const discountPersantage = new Container('product-card__price-discount').render();
        discountPersantage.textContent = `- ${discount}% Off`;
        productPrice.append(productPriceValid, productPriceUnvalid, discountPersantage);
      } else if (price) {
        const amount = masterVariantPrice[0]?.value.centAmount.toString().slice(0, -2);
        const cents = masterVariantPrice[0]?.value.centAmount.toString().slice(-2);
        productPriceValid.textContent = `$${amount}.${cents} USD`;
        productPrice.append(productPriceValid);
      }
    } else {
      productPriceValid.textContent = `$${100}.00`;
      productPrice.append(productPriceValid);
    }

    const { variants } = this.product;
    const sizeVariants: SizeValue[] = [];
    variants.forEach((variant) => {
      variant.attributes?.forEach((attribute) => {
        if (attribute.name === 'size' || attribute.name === 'size-w') {
          sizeVariants.push(attribute.value);
        }
      });
    });
    const sizeContainer = new Container('product-card__size-container').render();

    if (sizeVariants) {
      const sizeHeader = new Heading(3, 'product-card__size-heading', 'Choose a Size').render();
      const sizeElementContainer = new Container('product-card__size-elements').render();
      sizeVariants?.forEach((size) => {
        const elContainer = new Container('product-card__size-el-container').render();
        const sizeElInput = new Input('size', 2, 'product-card__size-input', '', 'radio').render() as HTMLInputElement;
        sizeElInput.value = size.label;
        const sizeElText = new Label('size', `${sizeElInput.value}`, 'product-card__size-el-text').render();
        elContainer.append(sizeElInput, sizeElText);
        sizeElementContainer.append(elContainer);
      });
      sizeContainer.append(sizeHeader, sizeElementContainer);
    }

    const btnContainer = new Container('product-card__btn-container').render();
    const quantatyBtn = new Container('quantity-container').render();
    const minusBtnElement = new Button('-', 'button', 'minus-btn').render();
    const quantatyNum = new Container('quantity-num').render();
    quantatyNum.textContent = '1';
    const plusBtnElement = new Button('+', 'button', 'plus-btn').render();
    quantatyBtn.append(minusBtnElement, quantatyNum, plusBtnElement);

    const minusHandler = () => {
      const currentValue = parseInt(quantatyNum.textContent || '1', 10);

      if (currentValue > 1) {
        quantatyNum.textContent = (currentValue - 1).toString();
        quantatyNum.dataset.setId = (currentValue - 1).toString();
      }
    };

    const plusHandler = () => {
      const currentValue = parseInt(quantatyNum.textContent || '1', 10);
      quantatyNum.textContent = (currentValue + 1).toString();
      quantatyNum.dataset.setId = (currentValue + 1).toString();
    };

    let addToBasketBtn;
    let inCartInfo;

    if (this.productInCart === false) {
      addToBasketBtn = new Button('Add to Cart', 'button', 'add-to-basket__button').render();
      minusBtnElement.addEventListener('click', minusHandler);
      plusBtnElement.addEventListener('click', plusHandler);
      minusBtnElement.classList.remove('button-inactive');
      plusBtnElement.classList.remove('button-inactive');
      quantatyNum.classList.remove('button-inactive');
    } else if (this.productInCart === true) {
      addToBasketBtn = new Button('Remove from Cart', 'button', 'add-to-basket__button-remove').render();
      inCartInfo = new Container('product-card__info', 'This product has been added to the Cart').render();
      minusBtnElement.classList.add('button-inactive');
      plusBtnElement.classList.add('button-inactive');
      quantatyNum.classList.add('button-inactive');
    }

    btnContainer.append(quantatyBtn);

    if (addToBasketBtn && this.productInCart && inCartInfo) {
      sizeContainer.append(inCartInfo);
      btnContainer.append(addToBasketBtn);
    } else if (addToBasketBtn !== undefined) {
      btnContainer.append(addToBasketBtn);
    }

    const descriptionHeader = new Heading(3, 'product-card__description-header', 'Description').render();
    const productDescription = new ElementCreator({
      tag: 'p',
      classNames: 'product-card__description',
      text: `${
        this.product.description?.['en-US'] || 'Best sneakers with logos are debossed in black on the heel wrap'
      }`,
    }).getElement();

    this.content.append(productName, productPrice, sizeContainer, btnContainer, descriptionHeader, productDescription);

    return this.content;
  };
}
