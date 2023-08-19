import './RegistrationForm.css';
import ElementCreator from '../../utils/ElementCreator';
import Component from '../Component';
import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Container from '../../UI/Container';
import ShippingAddress from './AddressFields/ShippingAddress';
import BillingAddress from './AddressFields/BillingAddress';
import DataFields from './DataFields/DataFields';
import SuccessfulMessage from './SuccessfulMessage/SuccessfulMessage';
import ErrorMessage from './ErrorMessage/ErrorMessage';

export default class RegistrationForm extends Component {
  render = () => {
    const form = new Form('/', 'post', 'regform');
    this.content = form.render();
    this.content.setAttribute('novalidate', '');
    const formContainer = new Container('regform-container').render();

    const formHeader = new ElementCreator({ tag: 'h2', classNames: 'regform-header', text: 'Register' }).getElement();
    const formInstruction = new ElementCreator({
      tag: 'p',
      classNames: 'regform-text',
      text: 'Please fill in this form to create an account.',
    }).getElement();

    const loginContainer = new Container('login-btn-container').render();
    const loginInstruction = new ElementCreator({
      tag: 'p',
      classNames: 'regform-text',
      text: 'Already have an account?',
    }).getElement();
    const logButton = new Button('Login', 'button', 'regform-login-btn').render();
    loginContainer.append(loginInstruction, logButton);

    const dataFields = new DataFields().render();
    const shippingAddress = new ShippingAddress().render();
    const billingAddress = new BillingAddress().render();
    this.toggleBillingAddress(shippingAddress, billingAddress);

    const regButton = new Button('Register', 'submit', 'regform-btn').render();

    formContainer.append(
      formHeader,
      formInstruction,
      loginContainer,
      dataFields,
      shippingAddress,
      billingAddress,
      regButton
    );
    this.content.appendChild(formContainer);

    return this.content;
  };

  setError = (element: HTMLInputElement | HTMLSelectElement, message: string) => {
    let errorContainer = element.nextElementSibling as HTMLElement;

    if (!errorContainer || !errorContainer.classList.contains('reg-error')) {
      errorContainer = new ElementCreator({
        tag: 'span',
        classNames: 'reg-error',
      }).getElement();
      element.after(errorContainer);
    }

    element.classList.remove('success');
    element.classList.add('error');
    errorContainer.textContent = message;
    return errorContainer;
  };

  setSuccess = (element: HTMLInputElement | HTMLSelectElement) => {
    element.classList.remove('error');
    element.classList.add('success');
    const errorContainer = element.nextElementSibling as HTMLElement;

    if (errorContainer !== null && errorContainer.classList.contains('reg-error')) {
      errorContainer.textContent = '';
    }
  };

  showSuccessMessage = () => {
    const message = new SuccessfulMessage().render();
    const body = document.querySelector('body');
    const pageContainer = document.querySelector('.page-container') as HTMLElement;

    if (pageContainer !== null && body !== null) {
      pageContainer.append(message);
      body.style.overflow = 'hidden';
      this.closeModal(pageContainer, message, body);
    }
  };

  showErrorMessage = (text: string) => {
    const message = new ErrorMessage().render(text);
    const body = document.querySelector('body');
    const pageContainer = document.querySelector('.page-container') as HTMLElement;

    if (pageContainer !== null && body !== null) {
      pageContainer.append(message);
      body.style.overflow = 'hidden';
      this.closeModal(pageContainer, message, body);
    }
  };

  private closeModal = (elClicked: HTMLElement, targetEL: HTMLElement, body: HTMLBodyElement) => {
    const localBody = body;
    elClicked.addEventListener('click', () => {
      targetEL.classList.add('hidden');
      localBody.style.overflow = 'initial';
    });
  };

  private toggleBillingAddress = (parentElement: HTMLElement, changedElement: HTMLElement) => {
    parentElement.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target && target.name === 'address-checkbox' && target.type === 'checkbox') {
        if (target.checked) {
          changedElement.classList.add('hidden');
        } else {
          changedElement.classList.remove('hidden');
        }
      }
    });
  };
}
