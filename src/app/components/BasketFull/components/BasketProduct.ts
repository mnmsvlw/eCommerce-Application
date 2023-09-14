import { LineItem, Price } from '@commercetools/platform-sdk';
import Component from '../../Component';
import Container from '../../../UI/Container';
import Button from '../../../UI/Button';
import ImageElement from '../../../UI/Img';
import updateCartRemoveItem from '../../../api/cart/updateCartRemoveItem';
import updateCartAddItem from '../../../api/cart/updateCartAddItem';
import redirect from '../../../utils/redirect';

export default class BasketProduct extends Component {
  render = (item: LineItem) => {
    this.content = new Container('basket-product-container').render();
    console.log('item', item);
    const { images } = item.variant;
    let imgUrl;

    if (images) {
      imgUrl = images[0].url;
    }

    const img = new Container('imgBox-product').render();
    const itemImage = new ImageElement(String(imgUrl), String(item.name['en-US']), 'img-product').render();
    img.append(itemImage);

    const title = new Container('title-product', `${item.name['en-US']}`).render();

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

    const minusHandler = () => {
      const currentValue = parseInt(qtyNum.textContent || '1', 10);

      if (currentValue > 1) {
        qtyNum.textContent = (currentValue - 1).toString();
        updateCartRemoveItem(item.id, 1);
        redirect('/basket/');
      }
    };

    const plusHandler = () => {
      const currentValue = parseInt('1', 10);
      qtyNum.textContent = (currentValue + 1).toString();
      updateCartAddItem(item.productId, currentValue);
      redirect('/basket/');
    };

    minusBtn.addEventListener('click', minusHandler);
    plusBtn.addEventListener('click', plusHandler);

    const totalPrice = new Container('totalPrice-product', `$${item.totalPrice.centAmount / 100}`).render();
    const removeBox = new Container('removeBox').render();
    const remove = new Container('btn-remove').render();
    remove.addEventListener('click', () => {
      updateCartRemoveItem(item.id);
      redirect('/basket/');
    });
    removeBox.append(remove);
    this.content.append(img, title, unitPriceBox, qty, totalPrice, removeBox);

    return this.content;
  };
}
