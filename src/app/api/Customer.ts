import type { CreateCustomerData } from '../../types/registrationTypes';
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

export default createCustomer;
