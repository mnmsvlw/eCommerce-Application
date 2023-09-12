import sdkClient from '../SdkClient';

const getActiveCart = async () => {
  const carts = await sdkClient.apiRoot.me().carts().get().execute();

  if (carts.body.count === 0) {
    const newCart = (
      await sdkClient.apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute()
    ).body;
    return newCart;
  }

  const activeCart = (await sdkClient.apiRoot.me().activeCart().get().execute()).body;
  return activeCart;
};

export default getActiveCart;
