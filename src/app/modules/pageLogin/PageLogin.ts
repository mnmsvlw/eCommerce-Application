import Component from '../../components/Component';
import LoginForm from '../../components/LoginForm/LoginForm';
import { changeStyleBorder } from './helpers/functionForValidateInput';
import isValidInput from './helpers/ValidateInput';
import validateEmail from './helpers/ValidateEmail';
import validatePassword from './helpers/ValidatePassword';

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
          console.log('SUBMIT');
        } else {
          changeStyleBorder(mail);
          changeStyleBorder(pass);
        }
      }
      if (el.classList.contains('regBtn')) {
        e.preventDefault();
        const url = `${window.location.origin}/register/`;
        console.log(url);
        window.history.pushState(null, '', url);
        window.dispatchEvent(new Event('popstate'));
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
