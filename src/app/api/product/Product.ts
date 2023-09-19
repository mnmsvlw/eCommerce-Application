import sdkClient from '../SdkClient';

export default async function getProduct(itemId: string) {
  const response = await sdkClient.apiRoot.productProjections().withId({ ID: itemId }).get().execute();

  console.log('Product received:', response.body);
  return response;
}
