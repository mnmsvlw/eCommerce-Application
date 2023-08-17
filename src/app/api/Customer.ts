import type { CreateCustomerData, LoginData } from '../../types/registrationTypes';
import { apiRoot } from './Client';

const createCustomer = async (createDataReceived: CreateCustomerData) => {
  const response = await apiRoot
    .me()
    .signup()
    .post({
      body: createDataReceived,
    })
    .execute();

  console.log('Customer created:', response.body.customer);
};

const loginCustomer = async (loginDataReceived: LoginData) => {
  const response = await apiRoot
    .me()
    .login()
    .post({
      body: loginDataReceived,
    })
    .execute();

  console.log('Customer logined:', response.body.customer);
};

export { createCustomer, loginCustomer };
