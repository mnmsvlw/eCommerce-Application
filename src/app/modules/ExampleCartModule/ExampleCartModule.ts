import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Component from '../../components/Component';
import updateCartAddItem from '../../api/cart/updateCartAddItem';

export default class ExampleCartModule extends Component {
  render = () => {
    const itemIdInput = new Input('item-id', 50, 'item-id', 'item id...', 'text').render();
    const addToCartButton = new Button('Add', 'button', 'add-button');

    addToCartButton.addListener('click', async () => {
      const itemId = document.querySelector('.item-id') as HTMLInputElement;
      updateCartAddItem(itemId.value);
    });

    this.content.append(itemIdInput, addToCartButton.render());
    return this.content;
  };
}
