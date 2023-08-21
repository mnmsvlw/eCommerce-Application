import Path from '../../../types/enum';
import { CreateCustomerData } from '../../../types/registrationTypes';
import { createCustomer, loginCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import redirect from '../../utils/redirect';
import Validator from './validation/Validator';

export default class RegistrationModule extends Component {
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
        console.log(this.dataToSubmit);
        this.registerUser(this.dataToSubmit, form);
      }
    });

    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains('regform-login-btn')) {
        e.preventDefault();
        const url = `${window.location.origin}/login/`;
        console.log(url);
        window.history.pushState(null, '', url);
        window.dispatchEvent(new Event('popstate'));
      }
    });

    return this.content;
  };

  private registerUser = async (registrationData: CreateCustomerData, form: RegistrationForm) => {
    try {
      await createCustomer(registrationData);
      form.showSuccessMessage();

      setTimeout(async () => {
        await loginCustomer({
          email: registrationData.email,
          password: registrationData.password,
        });
        sdkClient.setPasswordFlow(registrationData.email, registrationData.password);
        await sdkClient.apiRoot.me().get().execute();
        sdkClient.userEmail = `${registrationData.firstName} ${registrationData.lastName}`;
        localStorage.setItem('name', `${registrationData.firstName} ${registrationData.lastName}`);
        redirect(Path.MAIN_PAGE);
      }, 1000);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('There is already an existing customer with the provided email.')
      ) {
        form.showErrorMessage(
          'Your account has already been created! Use login to access your account or register with another email.'
        );
      } else {
        form.showErrorMessage('Registration failed. Please try again later.');
      }
    }
  };
}
