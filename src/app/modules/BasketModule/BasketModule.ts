import Container from '../../UI/Container';
import getActiveCart from '../../api/cart/getActiveCart';
import BasketEmpty from '../../components/BasketEmpty/BasketEmpty';
import BasketFull from '../../components/BasketFull/BasketFull';
import Component from '../../components/Component';
import './BasketModule.css';

export default class BasketModule extends Component {
  render = () => {
    this.content = new Container('basket-page').render();
    setTimeout(async () => {
      const cart = await getActiveCart();

      if (cart.lineItems.length > 0) {
        this.content.append(new BasketFull().render(cart));
      } else {
        this.content.append(new BasketEmpty().render());
      }
    });

    return this.content;
  };
}
