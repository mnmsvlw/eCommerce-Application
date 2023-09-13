import { Cart } from '@commercetools/platform-sdk';
import sdkClient from '../SdkClient';

const updateCartRemoveItem = async (itemId: string, quantityProduct?: number) => {
  const currentCart = sdkClient.activeCart as Cart;
  sdkClient.activeCart = (
    await sdkClient.apiRoot
      .me()
      .carts()
      .withId({ ID: currentCart.id })
      .post({
        body: {
          version: currentCart.version,
          actions: [{ action: 'removeLineItem', lineItemId: itemId, quantity: quantityProduct }],
        },
      })
      .execute()
  ).body;
};

export default updateCartRemoveItem;
