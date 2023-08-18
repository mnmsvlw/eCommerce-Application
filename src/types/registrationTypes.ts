export interface CreateCustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressReg[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface AddressReg {
  key: string;
  streetName: string;
  streetNumber?: string;
  city: string;
  postalCode: string;
  country: string;
}

export type RegisterUserFunction = (registrationData: CreateCustomerData) => void;

export interface LoginData {
  email: string;
  password: string;
}

export interface OptionKeyValuePair {
  value: string;
  text: string;
}
