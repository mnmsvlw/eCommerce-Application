import { Cart, LineItem, Price, ProductProjection } from '@commercetools/platform-sdk';
import Component from '../../Component';
import Container from '../../../UI/Container';
import Button from '../../../UI/Button';
import ImageElement from '../../../UI/Img';
import updateCartRemoveItem from '../../../api/cart/updateCartRemoveItem';
import updateCartAddItem from '../../../api/cart/updateCartAddItem';
import redirect from '../../../utils/redirect';
import sdkClient from '../../../api/SdkClient';

export default class BasketProduct extends Component {
  render = (item: LineItem) => {
    this.content = new Container('basket-product-container loader').render();
    this.renderData(this.content, item).then(() => this.content.classList.remove('loader'));

    return this.content;
  };

  async renderData(box: HTMLElement, item: LineItem) {
    const { productKey } = item;
    let imgUrl;
    let product: ProductProjection;

    if (productKey) {
      product = (await sdkClient.apiRoot.productProjections().withKey({ key: productKey }).get().execute()).body;
      const { images } = product.masterVariant;

      console.log('productData:', product);
      console.log('new-item:', item);

      if (images) {
        imgUrl = images[0].url;
      }
    }

    const productBox = new Container('productBox').render();
    const img = new Container('imgBox-product').render();
    const itemImage = new ImageElement(String(imgUrl), String(item.name['en-US']), 'img-product').render();
    img.append(itemImage);

    const nameBox = new Container('name-product').render();

    if (item.variant.attributes) {
      const attributes = item.variant.attributes.filter((el) => el.name === 'size');
      const size = new Container('size-product', `${attributes[0].value.label}`).render();
      const title = new Container('title-product', `${item.name['en-US']}`).render();
      nameBox.append(title, size);
    }

    productBox.append(img, nameBox);
    const prices = item.variant.prices as Price[];
    const unitPriceBox = new Container('unitPriceBox').render();

    const unitPrice = new Container('unitPrice-product', `$${prices[0].value.centAmount / 100}`).render();

    if (prices[0].discounted) {
      const discountedPrice = new Container(
        'price-discount',
        `$${prices[0].discounted.value.centAmount / 100}`
      ).render();

      const discountValue = Math.ceil((1 - prices[0].discounted.value.centAmount / prices[0].value.centAmount) * 100);
      const discount = new Container('discount', `-${discountValue}% off`).render();

      const discounteBox = new Container('discounteBox').render();
      unitPrice.classList.add('no');
      discounteBox.append(discount, unitPrice);
      unitPriceBox.append(discountedPrice, discounteBox);
    } else {
      unitPriceBox.append(unitPrice);
    }

    const qty = new Container('qty-product').render();
    const minusBtn = new Button('-', 'button', 'btn-minus').render();
    const qtyNum = new Container('qty-num').render();
    qtyNum.textContent = `${item.quantity}`;
    const plusBtn = new Button('+', 'button', 'btn-plus').render();
    qty.append(minusBtn, qtyNum, plusBtn);

    const minusHandler = async () => {
      const currentValue = parseInt(qtyNum.textContent || '1', 10);

      // if (currentValue > 1) {
      qtyNum.textContent = (currentValue - 1).toString();
      await updateCartRemoveItem(item.id, 1);
      redirect('/basket/');
      // }

      const currentCart = sdkClient.activeCart as Cart;

      if (currentCart.lineItems.length > 0) {
        const cartCounter = document.querySelector('.cart-counter') as HTMLElement;
        const customEvent = new Event('cartChanged');
        cartCounter.dispatchEvent(customEvent);
      }
    };

    const plusHandler = async () => {
      const currentValue = parseInt('1', 10);
      qtyNum.textContent = (currentValue + 1).toString();
      await updateCartAddItem(product.id, currentValue, item.variant.id);
      redirect('/basket/');

      const currentCart = sdkClient.activeCart as Cart;

      if (currentCart.lineItems.length > 0) {
        const cartCounter = document.querySelector('.cart-counter') as HTMLElement;
        const customEvent = new Event('cartChanged');
        cartCounter.dispatchEvent(customEvent);
      }
    };

    minusBtn.addEventListener('click', minusHandler, { once: true });
    plusBtn.addEventListener('click', plusHandler, { once: true });

    const totalPrice = new Container('totalPrice-product', `$${item.totalPrice.centAmount / 100}`).render();
    const removeBox = new Container('removeBox').render();
    const remove = new Container('btn-remove').render();
    remove.addEventListener('click', async () => {
      await updateCartRemoveItem(item.id);
      redirect('/basket/');

      const currentCart = sdkClient.activeCart as Cart;

      if (currentCart.lineItems.length > 0) {
        const cartCounter = document.querySelector('.cart-counter') as HTMLElement;
        const customEvent = new Event('cartChanged');
        cartCounter.dispatchEvent(customEvent);
      }
    });
    removeBox.append(remove);
    box.append(productBox, unitPriceBox, qty, totalPrice, removeBox);

    return box;
  }
}
