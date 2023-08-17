import { CreateCustomerData } from '../../../types/registrationTypes';
import createCustomer from '../../api/Customer';
import Component from '../../components/Component';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Validator from './validation/Validator';

export default class PageRegistration extends Component {
  dataToSubmit: CreateCustomerData | null;

  constructor() {
    super();
    this.dataToSubmit = null;
  }

  render = () => {
    const form = new RegistrationForm();
    this.content = form.render();
    let validator: Validator;

    this.content.addEventListener('input', (e) => {
      e.preventDefault();
      if (typeof validator === 'undefined') {
        validator = new Validator(form);
      }
      validator.validateOnEntry(e);
    });

    this.content.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof validator === 'undefined') {
        validator = new Validator(form);
      }
      this.dataToSubmit = validator.validateOnSubmit();
      if (this.dataToSubmit !== null) {
        this.registerUser(this.dataToSubmit, form);
      }
    });

    return this.content;
  };

  registerUser = async (registrationData: CreateCustomerData, form: RegistrationForm) => {
    try {
      await createCustomer(registrationData);
      form.showSuccessMessage();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('There is already an existing customer with the provided email.')
      ) {
        form.showErrorMessage('Your account has already been created! Use log in to access your account.');
      } else {
        form.showErrorMessage('Registration failed.');
      }
    }
  };
}
