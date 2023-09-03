import sdkClient from '../SdkClient';

export default async function getProduct(keyItem: string) {
  const response = await sdkClient.apiRoot.productProjections().withKey({ key: keyItem }).get().execute();

  console.log('Product received:', response.body);
  return response;
}
