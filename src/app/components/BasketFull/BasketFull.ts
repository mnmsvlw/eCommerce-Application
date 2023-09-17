import { Cart } from '@commercetools/platform-sdk';
import Container from '../../UI/Container';
import Component from '../Component';
import BasketHeader from './components/BacketHeader';
import BasketInfo from './components/BasketInfo';
import BasketProduct from './components/BasketProduct';
import './BasketFull.css';

export default class BasketFull extends Component {
  render = (cart: Cart) => {
    this.content = new Container('basket-wrapper').render();

    const header = new BasketHeader().render(cart);
    const basket = new Container('basket').render();
    cart.lineItems.forEach((item) => {
      basket.append(new BasketProduct().render(item));
    });
    const info = new BasketInfo().render(cart);

    this.content.append(header, basket, info);

    return this.content;
  };
}
