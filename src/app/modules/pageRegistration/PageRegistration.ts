import EventEmitter from 'events';
import { CreateCustomerData } from '../../../types/registrationTypes';
import createCustomer from '../../api/Customer';
import Component from '../../components/Component';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Validator from './validation/Validator';

export default class PageRegistration extends Component {
  emitter: EventEmitter;

  dataToSubmit: CreateCustomerData | null;

  constructor(emitter: EventEmitter) {
    super();
    this.emitter = emitter;
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
        this.registerUser(this.dataToSubmit);
      }
    });

    return this.content;
  };

  registerUser = (registrationData: CreateCustomerData) => {
    createCustomer(registrationData);
  };
}
