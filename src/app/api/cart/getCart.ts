import sdkClient from '../SdkClient';

const getCart = async () => {
  return (await sdkClient.apiRoot.me().carts().get().execute()).body;
};

export default getCart;
