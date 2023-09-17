import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
import sdkClient from '../SdkClient';

/* export type Action = {
  action: string;
  lineItemId: string;
  quantity: number;
}; */

const clearCart = async (actions: MyCartUpdateAction[]) => {
  const currentCart = sdkClient.activeCart as Cart;
  sdkClient.activeCart = (
    await sdkClient.apiRoot
      .me()
      .carts()
      .withId({ ID: currentCart.id })
      .post({
        body: {
          version: currentCart.version,
          actions,
        },
      })
      .execute()
  ).body;
};

export default clearCart;
