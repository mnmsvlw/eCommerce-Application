import { Cart } from '@commercetools/platform-sdk';
import sdkClient from '../SdkClient';

const updateCartAddItem = async (itemId: string, quantaty = 1, variant?: 1) => {
  const currentCart = sdkClient.activeCart as Cart;
  sdkClient.activeCart = (
    await sdkClient.apiRoot
      .me()
      .carts()
      .withId({ ID: currentCart.id })
      .post({
        body: {
          version: currentCart.version,
          actions: [{ action: 'addLineItem', productId: String(itemId), variantId: variant, quantity: quantaty }],
        },
      })
      .execute()
  ).body;
};

export default updateCartAddItem;
