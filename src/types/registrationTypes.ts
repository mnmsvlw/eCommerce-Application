export interface CreateCustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface AddressReg {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export type RegisterUserFunction = (registrationData: CreateCustomerData) => void;
