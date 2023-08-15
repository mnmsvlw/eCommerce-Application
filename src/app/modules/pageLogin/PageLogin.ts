import Component from '../../components/Component';
import LoginForm from '../../components/LoginForm/LoginForm';
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
      const show = document.querySelector('.show-input') as HTMLInputElement;
      e.preventDefault();
      const el = e.target as HTMLElement;
      if (el.classList.contains('show-input')) {
        pass.type = show.checked ? 'text' : 'password';
      }
      if (el.classList.contains('loginBtn')) {
        if (valid.email && valid.pass) {
          console.log('POST submit');
        } else {
          if (mail.value === '') {
            mail.style.border = '2px solid red';
            setTimeout(() => {
              mail.style.border = '1px solid black';
            }, 1000);
          }
          if (pass.value === '') {
            pass.style.border = '2px solid red';
            setTimeout(() => {
              pass.style.border = '1px solid black';
            }, 1000);
          }
        }
      }
      if (el.classList.contains('regBtn')) {
        const path = window.location.href;
        const newPath = path.replace(/login/i, 'register');
        window.location.href = newPath;
      }
    });
    this.content.addEventListener('input', (e) => {
      console.log('input', e.target);
      const el = e.target as HTMLInputElement;
      if (el.classList.contains('email-input')) {
        valid.email = isValidInput(el, '.errorMail', validateEmail);
      }
      if (el.classList.contains('pass-input')) {
        valid.pass = isValidInput(el, '.errorPass', validatePassword);
      }
    });
    return this.content;
  };
}
