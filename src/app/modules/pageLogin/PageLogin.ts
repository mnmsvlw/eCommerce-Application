import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import Component from '../../components/Component';
import LoginForm from '../../components/LoginForm/LoginForm';
import { changeStyleBorder, hideError, showError } from './helpers/functionForValidateInput';
import isValidInput from './helpers/ValidateInput';
import validateEmail from './helpers/ValidateEmail';
import validatePassword from './helpers/ValidatePassword';
import getCustomer from '../../api/Castomer/GetCastomer';
import navItems from '../../data/navItems';
import changePage from './helpers/ChangePage';

export default class PageLogin extends Component {
  render = () => {
    const valid = {
      email: false,
      pass: false,
    };
    this.content = new LoginForm().render();
    this.content.addEventListener('click', (e) => {
      const mail = this.content.querySelector('.email-input') as HTMLInputElement;
      const pass = this.content.querySelector('.pass-input') as HTMLInputElement;
      const el = e.target as HTMLElement;
      if (el.classList.contains('loginBtn')) {
        if (valid.email && valid.pass) {
          getCustomer(mail.value, pass.value)
            .then((data: ClientResponse<CustomerSignInResult>) => {
              if (data.body.customer.version === 1) {
                navItems.map((x) => {
                  const a = x;
                  if (a.title === 'Profile') {
                    a.title = `${data.body.customer.firstName} ${data.body.customer.lastName}`;
                  }
                  if (a.title === 'Login') {
                    a.title = 'Logout';
                    a.href = '/logout/';
                  }
                  return a;
                });
                changePage('/');
              }
            })
            .catch((err) => {
              if (err.code === 400) {
                showError('.errorLogin', '⚠️ Wrong login or password');
                this.content.addEventListener('input', () => hideError('.errorLogin'));
                this.content.removeEventListener('input', () => hideError('.errorLogin'));
              }
            });
        } else {
          changeStyleBorder(mail);
          changeStyleBorder(pass);
        }
      }
      if (el.classList.contains('regBtn')) {
        e.preventDefault();
        changePage('/register/');
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
