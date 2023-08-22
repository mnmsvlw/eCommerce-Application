import type { CreateCustomerData, AddressReg } from '../../../../types/registrationTypes';
import RegistrationForm from '../../../components/RegistrationForm/RegistrationForm';
import ValidationRules from './ValidationRules/ValidationRules';

export default class Validator {
  form: HTMLElement;

  fields: (HTMLInputElement | HTMLSelectElement)[];

  formComponent: RegistrationForm;

  createCustomerData: CreateCustomerData;

  addressShip: AddressReg;

  addressBill: AddressReg;

  VRules: ValidationRules;

  constructor(form: RegistrationForm) {
    this.form = form.content;
    this.fields = this.initializeFields();
    this.formComponent = form;
    this.VRules = new ValidationRules();
    this.createCustomerData = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      addresses: [],
    };
    this.addressShip = {
      key: 'KeyShipping',
      streetName: '',
      city: '',
      postalCode: '',
      country: '',
    };
    this.addressBill = {
      key: 'KeyBilling',
      streetName: '',
      city: '',
      postalCode: '',
      country: '',
    };
    this.countFieldsToBeSubmitted();
  }

  validateOnSubmit(): CreateCustomerData | null {
    let isValid = true;
    this.fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      return this.gatherDataForSubmit();
    }

    return null;
  }

  validateOnEntry(e: Event) {
    const field = e.target as HTMLInputElement | HTMLSelectElement;

    if ((field.tagName === 'INPUT' && field.getAttribute('type') !== 'checkbox') || field.tagName === 'SELECT') {
      this.validateField(field);
    }
  }

  private gatherDataForSubmit = (): CreateCustomerData => {
    const existingShippingIndex = this.createCustomerData.addresses.findIndex(
      (address) => address.key === this.addressShip.key
    );

    if (existingShippingIndex !== -1) {
      this.createCustomerData.addresses[existingShippingIndex] = { ...this.addressShip };
    } else {
      this.createCustomerData.addresses.push(this.addressShip);
    }

    const existingBillingIndex = this.createCustomerData.addresses.findIndex(
      (address) => address.key === this.addressBill.key
    );

    if (existingBillingIndex !== -1) {
      this.createCustomerData.addresses[existingBillingIndex] = { ...this.addressBill };
    } else {
      this.createCustomerData.addresses.push(this.addressBill);
    }

    const addressCheckbox = this.form.querySelector('input[name="address-checkbox"]') as HTMLInputElement;

    if (addressCheckbox.checked) {
      const shippingAddress = this.createCustomerData.addresses.find((add) => add.key === 'KeyShipping') as AddressReg;
      this.createCustomerData.addresses = [];
      this.createCustomerData.addresses.push(shippingAddress);
      this.createCustomerData.shippingAddresses = [0];
      this.createCustomerData.billingAddresses = [0];
    } else {
      this.createCustomerData.shippingAddresses = [0];
      this.createCustomerData.billingAddresses = [1];
    }

    const ShippingDefault = this.form.querySelector('input[name="ship-checkbox"]') as HTMLInputElement;

    if (ShippingDefault.checked) {
      this.createCustomerData.defaultShippingAddress = 0;
    }

    const BillingDefault = this.form.querySelector('input[name="bill-checkbox"]') as HTMLInputElement;

    if (BillingDefault.checked && addressCheckbox.checked) {
      this.createCustomerData.defaultBillingAddress = 0;
    } else if (BillingDefault.checked) {
      this.createCustomerData.defaultBillingAddress = 1;
    }

    return this.createCustomerData;
  };

  private validateField(field: HTMLInputElement | HTMLSelectElement): boolean {
    let isValid = true;
    const shippingAddressContainer = field.closest('.regform-container__shipping-address');
    const billingAddressContainer = field.closest('.regform-container__billing-address');
    const addressParts = field.value.split(' ');

    // const addressCheckbox = this.form.querySelector('input[name="address-checkbox"]') as HTMLInputElement;
    // field.addEventListener('input', () => {
    //   if (addressCheckbox.checked) {
    //     this.addressBill = { ...this.addressShip, key: this.addressBill.key };
    //   }
    // });

    if (field.value === '') {
      const previousElementSibling = field.previousElementSibling as HTMLElement | null;

      if (previousElementSibling instanceof HTMLElement) {
        this.setStatus(field, `${previousElementSibling.innerText} cannot be blank`, 'error');
        isValid = false;
      }
    } else if (field.tagName === 'INPUT') {
      const fieldName = field.getAttribute('name');
      let validationFunction: (value: string) => boolean;
      let message: string;

      switch (fieldName) {
        case 'regemail':
          validationFunction = this.VRules.email;
          message = 'Please enter a valid email address';
          this.createCustomerData.email = field.value;
          break;
        case 'regpassword':
          validationFunction = this.VRules.password;
          message =
            'Password must contain at least 8 characters, including 1 uppercase and 1 lowercase letter, 1 number and 1 special character';
          this.createCustomerData.password = field.value;
          break;
        case 'regFirstName':
        case 'regLastName':
          validationFunction = this.VRules.name;
          message = 'Last name must contain only letters';

          if (fieldName === 'regFirstName') {
            this.createCustomerData.firstName = field.value;
          } else {
            this.createCustomerData.lastName = field.value;
          }

          break;
        case 'regBirthDay':
          validationFunction = this.VRules.dateOfBirth;
          message = 'You must be at least 13 years old';
          this.createCustomerData.dateOfBirth = field.value;
          break;
        case 'regstreet':
          validationFunction = this.VRules.street;
          message = 'Must contain at least one character';

          if (addressParts != null) {
            const streetNumber = addressParts.find((part) => /^\d+$/.test(part));
            const streetName = addressParts.filter((part) => !/^\d+$/.test(part)).join(' ');

            if (shippingAddressContainer) {
              this.addressShip.streetNumber = streetNumber !== undefined ? parseInt(streetNumber, 10).toString() : '';
              this.addressShip.streetName = streetName;
            } else if (billingAddressContainer) {
              this.addressBill.streetNumber = streetNumber !== undefined ? parseInt(streetNumber, 10).toString() : '';
              this.addressBill.streetName = streetName;
            }
          }

          break;
        case 'regcity':
          validationFunction = this.VRules.city;
          message = 'City must contain only letters';

          if (shippingAddressContainer) {
            this.addressShip.city = field.value;
          } else if (billingAddressContainer) {
            this.addressBill.city = field.value;
          }

          break;
        case 'regpostalcode':
          validationFunction = this.VRules.postalCode;
          message = 'Invalid postal code';

          if (shippingAddressContainer) {
            this.addressShip.postalCode = field.value;
          } else if (billingAddressContainer) {
            this.addressBill.postalCode = field.value;
          }

          break;
        default:
          validationFunction = () => true;
          message = '';
          break;
      }

      if (!validationFunction(field.value)) {
        this.setStatus(field, message, 'error');
        isValid = false;
      } else {
        this.setStatus(field, '', 'success');
        isValid = true;
      }
    } else if (field.tagName === 'SELECT') {
      const fieldName = field.getAttribute('name');

      switch (fieldName) {
        case 'regcountry':
          if (!this.VRules.country(field.value)) {
            this.setStatus(field, 'Please select a country', 'error');
            isValid = false;
          } else {
            this.setStatus(field, '', 'success');
            isValid = true;

            if (shippingAddressContainer) {
              this.addressShip.country = field.value;
            } else if (billingAddressContainer) {
              this.addressBill.country = field.value;
            }
          }

          break;
        default:
          this.setStatus(field, '', 'success');
          isValid = true;
          break;
      }
    }

    return isValid;
  }

  private setStatus(field: HTMLElement, message: string, status: 'success' | 'error') {
    if (status === 'success') {
      this.formComponent.setSuccess(field as HTMLInputElement | HTMLSelectElement);
    } else if (status === 'error') {
      this.formComponent.setError(field as HTMLInputElement | HTMLSelectElement, message);
    }
  }

  private initializeFields = () => {
    this.fields = Array.from(this.form.querySelectorAll('form input, form select')) as (
      | HTMLInputElement
      | HTMLSelectElement
    )[];
    this.fields = this.fields.filter((field) => {
      return !(field.getAttribute('type') === 'checkbox');
    });
    return this.fields;
  };

  private countFieldsToBeSubmitted = () => {
    this.form.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target && target.name === 'address-checkbox' && target.type === 'checkbox') {
        if (target.checked && this.fields !== null) {
          this.addressBill = { ...this.addressShip, key: this.addressBill.key };
          this.fields = this.fields.filter((field) => {
            return (
              !(field.getAttribute('type') === 'checkbox') && !field.closest('.regform-container__billing-address')
            );
          });
        } else {
          this.initializeFields();
        }
      }
    });
  };
}
