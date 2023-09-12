import { Cart } from '@commercetools/platform-sdk';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';

export default class ExampleCartModule extends Component {
  render = () => {
    const itemIdInput = new Input('item-id', 50, 'item-id', 'item id...', 'text').render();
    const addToCartButton = new Button('Add', 'button', 'add-button');

    addToCartButton.addListener('click', async () => {
      const currentCart = sdkClient.activeCart as Cart;
      const itemId = document.querySelector('.item-id') as HTMLInputElement;
      sdkClient.activeCart = (
        await sdkClient.apiRoot
          .me()
          .carts()
          .withId({ ID: currentCart.id })
          .post({
            body: {
              version: currentCart.version,
              actions: [{ action: 'addLineItem', productId: String(itemId.value), variantId: 1, quantity: 1 }],
            },
          })
          .execute()
      ).body;
    });

    this.content.append(itemIdInput, addToCartButton.render());
    return this.content;
  };
}
