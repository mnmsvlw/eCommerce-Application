import Component from '../../components/Component';
import LoginForm from '../../components/LoginForm/LoginForm';
import { changeStyleBorder } from '../../utils/Functions/functionForValidateInput';
import isValidInput from '../../utils/Functions/ValidateInput';
import validateEmail from '../../utils/ValidateEmail';
import validatePassword from '../../utils/ValidatePassword';

export default class PageLogin extends Component {
  render = () => {
    const valid = {
      email: false,
      pass: false,
    };
    this.content = new LoginForm().render();
    this.content.addEventListener('click', (e) => {
      const mail = document.querySelector('.email-input') as HTMLInputElement;
      const pass = document.querySelector('.pass-input') as HTMLInputElement;
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
        const path = window.location.href;
        const newPath = path.replace(/login/i, 'login/register');
        window.location.href = newPath;
      }
    });

    this.content.addEventListener('input', (e) => {
      const pass = document.querySelector('.pass-input') as HTMLInputElement;
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
