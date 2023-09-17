// import { ProductProjection } from '@commercetools/platform-sdk';
import { Cart } from '@commercetools/platform-sdk';
import Button from '../../../UI/Button';
import Container from '../../../UI/Container';
import Input from '../../../UI/Input';
import Component from '../../Component';

export default class BasketInfo extends Component {
  render = (cart: Cart) => {
    this.content = new Container('basket-info-conteiner').render();

    const promoBox = new Container('promocode-info').render();
    const enterPromo = new Input('', 20, 'input-promocode', 'Promocode', 'text').render();
    const btnPromo = new Button('Redeem', 'button', 'btn-promocode').render();
    promoBox.append(enterPromo, btnPromo);

    const checkBox = new Container('check-info').render();

    const subtotal = new Container('item-info').render();
    const textSubtotal = new Container('text-item-info', 'Subtotal').render();
    const countSubtotal = new Container('count-item-info', `$${cart.totalPrice.centAmount / 100}`).render();
    subtotal.append(textSubtotal, countSubtotal);

    const shipping = new Container('item-info').render();
    const textShipping = new Container('text-item-info', 'Shipping fee').render();
    const countShipping = new Container('count-item-info', '$20').render();
    shipping.append(textShipping, countShipping);

    const promocode = new Container('item-info').render();
    const textPromocode = new Container('text-item-info', 'Promocode').render();
    const isPromocode = cart.discountCodes.length ? 'Yes' : 'No';
    const countPromocode = new Container('count-item-info', `${isPromocode}`).render();
    promocode.append(textPromocode, countPromocode);

    const total = new Container('item-info').render();
    total.classList.add('total');
    const textTotal = new Container('text-item-info-total', 'TOTAL').render();
    const countTotal = new Container('count-item-info-total', `$${cart.totalPrice.centAmount / 100 + 20}`).render();
    total.append(textTotal, countTotal);

    const btnCheckOut = new Button('Check out', 'button', 'btnCheckOut-info').render();
    checkBox.append(subtotal, shipping, promocode, total, btnCheckOut);

    this.content.append(promoBox, checkBox);
    return this.content;
  };
}
