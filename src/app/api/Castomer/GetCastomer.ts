import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from '../Client';

const getCustomer = async (
  customerEmail: string,
  customerPassword: string
): Promise<ClientResponse<CustomerSignInResult>> => {
  const response = await apiRoot
    .me()
    .login()
    .post({
      body: {
        email: customerEmail,
        password: customerPassword,
      },
    })
    .execute();

  return response;
};

export default getCustomer;
