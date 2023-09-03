import { changeDataCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import ProfileEmailPass from '../../components/Profile/ProfileEmailPass';
import validateEmail from '../LoginModule/helpers/validateEmail';
import isValidInput from '../LoginModule/helpers/validateInput';
import validatePassword from '../LoginModule/helpers/validatePassword';

export default class EmailPassModule extends Component {
  render = () => {
    this.content = new ProfileEmailPass().render();
    this.fillData(this.content);
    return this.content;
  };

  email: string = sdkClient.userInfo.email as string;

  mail!: HTMLInputElement;

  passInput!: HTMLInputElement;

  passLabel!: HTMLLabelElement;

  newPass!: HTMLInputElement;

  saveBtn!: HTMLElement;

  changeNewPassBox!: HTMLElement;

  fillData(content: HTMLElement): void {
    this.mail = content.querySelector('.input-email') as HTMLInputElement;
    this.passInput = content.querySelector('.input-pass') as HTMLInputElement;
    this.passLabel = content.querySelector('.label-pass') as HTMLLabelElement;
    this.newPass = content.querySelector('.input-new') as HTMLInputElement;
    this.saveBtn = content.querySelector('.save-e') as HTMLElement;
    this.changeNewPassBox = content.querySelector('.changeNewPass') as HTMLElement;

    this.mail.value = this.email;
    this.mail.readOnly = true;
    this.passInput.value = '********';
    this.passInput.readOnly = true;
    this.addListeners();
  }

  addListeners(): void {
    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      el.classList.contains('change-email') && this.changeIcon(el, this.mail, this.email, '.errorMailNew');
      el.classList.contains('change-pass') && this.changeIcon(el, this.newPass, '', '.errorPassNew');
      el.classList.contains('save-email') && this.saveData();
    });
  }

  changeIcon(el: HTMLElement, input: HTMLInputElement, data: string, err: string): void {
    const elem = input;
    const errorBox = this.content.querySelector(err) as HTMLElement;

    if (el.classList.contains('change')) {
      el.classList.remove('change');
      elem.readOnly = true;
      elem.value = data;
      errorBox.textContent = '';
      errorBox.style.display = 'none';

      if (err === '.errorPassNew') {
        elem.readOnly = true;
        this.passInput.value = '********';
        this.changeNewPassBox.classList.remove('show');
        this.passLabel.textContent = 'Email';
      }
    } else {
      el.classList.add('change');
      elem.readOnly = false;
      elem.focus();

      if (err === '.errorPassNew') {
        this.passInput.readOnly = false;
        this.passLabel.textContent = 'Enter your password';
        this.passInput.value = '';
        this.passInput.focus();
        this.changeNewPassBox.classList.add('show');
      }
    }

    this.listenInputs(elem, data, err);
  }

  listenInputs(input: HTMLInputElement, data: string, err: string) {
    input.addEventListener('input', () => {
      input.value !== data ? this.saveBtn.classList.remove('hide') : this.saveBtn.classList.add('hide');
      const click = (className: string) => input.classList.contains(className);
      click('input-email') && isValidInput(input, err, validateEmail);
      click('input-new') && this.passInput.value !== '' && isValidInput(input, err, validatePassword);
    });
  }

  isValid(el: HTMLInputElement, rules: (i: string) => boolean, text: string, error: string): void {
    const er = this.content.querySelector(error) as HTMLElement;
    const isValid: boolean = rules(el.value);

    if (isValid === false) {
      er.textContent = `•Invalid ${text}`;
      er.style.display = 'block';

      if (el.value === '') {
        er.style.display = 'none';
      }
    } else {
      er.textContent = '';
      er.style.display = 'none';
    }
  }

  saveData(): void {
    validateEmail(this.mail.value) === '' &&
      this.mail.value !== this.email &&
      changeDataCustomer([{ action: 'changeEmail', email: `${this.mail.value}` }], 'mail');
    validatePassword(this.newPass.value) === '' && console.log('изменить пароль!');
  }
}
