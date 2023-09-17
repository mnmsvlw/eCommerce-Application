import { Cart, MyCartRemoveLineItemAction, MyCartUpdateAction } from '@commercetools/platform-sdk';
import Container from '../../../UI/Container';
import Component from '../../Component';
import clearCart from '../../../api/cart/clearCart';
import redirect from '../../../utils/redirect';

export default class BasketHeader extends Component {
  render = (cart: Cart) => {
    this.content = new Container('basket-header-container').render();
    const product = new Container('product-header', 'PRODUCT').render();
    const priceUnit = new Container('price-header', 'UNIT PRICE').render();
    const qty = new Container('qty-header', 'QTY').render();
    const priceTotal = new Container('total-price-header', 'TOTAL PRICE').render();
    const clearBasketBtn = new Container('btn-clear', 'CLEAR ALL').render();

    const actions: MyCartUpdateAction[] = [];
    cart.lineItems.forEach((item) => {
      const action: MyCartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: item.id,
        quantity: item.quantity,
      };
      actions.push(action);
    });

    const clearBasket = () => {
      clearCart(actions);
      setTimeout(() => redirect('/basket/'), 0);
    };

    clearBasketBtn.addEventListener('click', clearBasket);
    this.content.append(product, priceUnit, qty, priceTotal, clearBasketBtn);
    return this.content;
  };
}
