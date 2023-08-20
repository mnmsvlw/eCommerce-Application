// import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import Component from '../../components/Component';
import LoginForm from '../../components/LoginForm/LoginForm';
import { changeStyleBorder, hideError, showError } from './helpers/animation';
import isValidInput from './helpers/validateInput';
import validateEmail from './helpers/validateEmail';
import validatePassword from './helpers/validatePassword';
// import getCustomer from '../../api/Customer/GetCustomer';
// import navItems from '../../data/navItems';
import redirect from '../../utils/redirect';
import Path from '../../../types/enum';
import sdkClient from '../../api/SdkClient';
import { loginCustomer } from '../../api/Customer';
import { ApiError } from '../../../types/sdkTypes';
// import sdkClient from '../../api/SdkClient';

export default class LoginModule extends Component {
  render = () => {
    const valid = {
      email: false,
      pass: false,
    };
    this.content = new LoginForm().render();
    this.content.addEventListener('click', async (e) => {
      const mail = this.content.querySelector('.email-input') as HTMLInputElement;
      const pass = this.content.querySelector('.pass-input') as HTMLInputElement;
      const el = e.target as HTMLElement;

      if (el.classList.contains('loginBtn')) {
        if (valid.email && valid.pass) {
          try {
            const loginResponse = await loginCustomer({ email: mail.value, password: pass.value });

            if (loginResponse.statusCode === 200) {
              sdkClient.setPasswordFlow(mail.value, pass.value);
              sdkClient.apiRoot.me().get().execute();
              sdkClient.userEmail = loginResponse.body.customer.email;
              redirect(Path.MAIN_PAGE);
            }
          } catch (err) {
            const apiError = err as ApiError;

            if (apiError.statusCode === 400) {
              showError('.errorLogin', '⚠️ Wrong login or password');
              this.content.addEventListener('input', () => hideError('.errorLogin'));
              this.content.removeEventListener('input', () => hideError('.errorLogin'));
            }
          }
        } else {
          changeStyleBorder(mail);
          changeStyleBorder(pass);
        }
      }

      if (el.classList.contains('regBtn')) {
        e.preventDefault();
        redirect(Path.REGISTRATION_PAGE);
      }
    });

    this.content.addEventListener('input', (e) => {
      const pass = this.content.querySelector('.pass-input') as HTMLInputElement;
      const el = e.target as HTMLInputElement;

      if (el.classList.contains('email-input')) {
        valid.email = isValidInput(el, '.errorMail', validateEmail);
      }

      if (el.classList.contains('pass-input')) {
        valid.pass = isValidInput(el, '.errorPass', validatePassword);
      }

      if (el.classList.contains('show-input')) {
        pass.type = el.checked ? 'text' : 'password';
        pass.focus();
      }
    });
    return this.content;
  };
}
