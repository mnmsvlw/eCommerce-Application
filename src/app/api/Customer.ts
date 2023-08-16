import type { CreateCustomerData } from '../../types/registrationTypes';
import { apiRoot } from './Client';

const createCustomer = async (createDataReceived: CreateCustomerData) => {
  try {
    const response = await apiRoot
      .me()
      .signup()
      .post({
        body: createDataReceived,
      })
      .execute();

    console.log('Customer created:', response.body.customer);
  } catch (error) {
    console.log('Error creating customer:', error);
  }
};

export default createCustomer;
