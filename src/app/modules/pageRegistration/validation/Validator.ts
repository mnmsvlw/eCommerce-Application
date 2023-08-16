import { CreateCustomerData, AddressReg } from '../../../../types/registrationTypes';
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
    };
    this.addressShip = {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    };
    this.addressBill = {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    };
    this.countFieldsToBeSubmitted();
  }

  validateOnSubmit(): CreateCustomerData | null {
    let isValid = true;
    this.fields.forEach((field) => {
      if (!this.validateFields(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      return this.createCustomerData;
    }

    return null;
  }

  validateOnEntry(e: Event) {
    const field = e.target as HTMLInputElement | HTMLSelectElement;
    if ((field.tagName === 'INPUT' && field.getAttribute('type') !== 'checkbox') || field.tagName === 'SELECT') {
      this.validateFields(field);
    }
  }

  private validateFields(field: HTMLInputElement | HTMLSelectElement): boolean {
    let isValid = true;

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
            'Weak password! It must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number';
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
          message = 'Street must contain only letters';
          this.addressShip.street = field.value;
          break;
        case 'regcity':
          validationFunction = this.VRules.city;
          message = 'City must contain only letters';
          this.addressShip.city = field.value;
          break;
        case 'regpostalcode':
          validationFunction = this.VRules.postalCode;
          message = 'Invalid postal code';
          this.addressShip.postalCode = field.value;
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
            this.addressShip.country = field.value;
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
