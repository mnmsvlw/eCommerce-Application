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

export { createCustomer, loginCustomer };
