import { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import type { CreateCustomerData, LoginData } from '../../../types/registrationTypes';
import sdkClient from '../SdkClient';

const createCustomer = async (createDataReceived: CreateCustomerData) => {
  const response = await sdkClient.apiRoot
    .me()
    .signup()
    .post({
      body: createDataReceived,
    })
    .execute();

  console.log('Customer created:', response.body.customer);
};

const loginCustomer = async (loginDataReceived: LoginData) => {
  const response = await sdkClient.apiRoot
    .me()
    .login()
    .post({
      body: loginDataReceived,
    })
    .execute();

  console.log('Customer logined:', response.body.customer);
  return response;
};

const changeDataCustomer = async (action: MyCustomerUpdateAction[]): Promise<ClientResponse<Customer>> => {
  const response = await sdkClient.apiRoot
    .me()
    .post({
      body: {
        version: sdkClient.userInfo.version as number,
        actions: action,
      },
    })
    .execute();
  alert('Your data has been successfully changed!');
  window.location.reload();
  return response;
};

export { createCustomer, loginCustomer, changeDataCustomer };
