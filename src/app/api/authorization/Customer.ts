import {
  ClientResponse,
  Customer,
  MyCustomerChangePassword,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
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

const changeDataCustomer = async (
  action: MyCustomerUpdateAction[],
  version: number = sdkClient.userInfo.version as number
): Promise<ClientResponse<Customer>> => {
  const response = await sdkClient.apiRoot
    .me()
    .post({
      body: {
        version,
        actions: action,
      },
    })
    .execute();

  return response;
};

const changePasswordCustomer = async (password: MyCustomerChangePassword): Promise<ClientResponse<Customer>> => {
  const response = await sdkClient.apiRoot
    .me()
    .password()
    .post({
      body: password,
    })
    .execute();

  return response;
};

export { createCustomer, loginCustomer, changeDataCustomer, changePasswordCustomer };
