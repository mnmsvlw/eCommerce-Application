import { changeDataCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import ProfilePersonalInfo from '../../components/Profile/ProfilePersonalInfo';
import Heading from '../../UI/Heading';
import ValidationRules from '../RegistrationModule/validation/ValidationRules/ValidationRules';

export default class PersonalInfoModule extends Component {
  render = () => {
    this.content = new ProfilePersonalInfo().render();
    sessionStorage.setItem('page', 'info');
    this.fillData(this.content);
    return this.content;
  };

  firstName: string = sdkClient.userInfo.firstName as string;

  lastName: string = sdkClient.userInfo.lastName as string;

  dateOfBirth: string = sdkClient.userInfo.dateOfBirth as string;

  first!: HTMLInputElement;

  last!: HTMLInputElement;

  date!: HTMLInputElement;

  saveBtn!: HTMLElement;

  VRules: ValidationRules = new ValidationRules();

  fillData(content: HTMLElement): void {
    this.first = content.querySelector('.input-first') as HTMLInputElement;

    this.last = content.querySelector('.input-last') as HTMLInputElement;

    this.date = content.querySelector('.input-date') as HTMLInputElement;

    this.saveBtn = content.querySelector('.save-i') as HTMLElement;

    this.first.value = this.firstName;
    this.first.readOnly = true;
    this.last.value = this.lastName;
    this.last.readOnly = true;
    this.date.value = this.dateOfBirth;
    this.date.readOnly = true;
    this.addListeners();
  }

  addListeners(): void {
    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      el.classList.contains('change-first') && this.changeIcon(el, this.first, this.firstName, '.errorFirstNew');
      el.classList.contains('change-last') && this.changeIcon(el, this.last, this.lastName, '.errorLastNew');
      el.classList.contains('change-date') && this.changeIcon(el, this.date, this.dateOfBirth, '.errorDateNew');
      el.classList.contains('save-info') && this.saveData();
    });
  }

  changeIcon(el: HTMLElement, input: HTMLInputElement, data: string, err: string): void {
    const elem = input;
    const errorBox = this.content.querySelector(err) as HTMLElement;

    if (el.classList.contains('change')) {
      const arrChange = this.content.querySelectorAll('.change');

      if (arrChange.length === 1) {
        this.saveBtn.classList.add('hide');
      }

      el.classList.remove('change');
      elem.readOnly = true;
      elem.value = data;
      errorBox.textContent = '';
      errorBox.style.display = 'none';
    } else {
      el.classList.add('change');
      elem.readOnly = false;
      elem.focus();
    }

    this.listenInputs(elem, data, err);
  }

  listenInputs(input: HTMLInputElement, data: string, err: string) {
    input.addEventListener('input', () => {
      input.value !== data ? this.saveBtn.classList.remove('hide') : this.saveBtn.classList.add('hide');
      const click = (className: string) => input.classList.contains(className);
      click('input-first') && this.isValid(input, this.VRules.name, 'FirstName', err);
      click('input-last') && this.isValid(input, this.VRules.name, 'LastName', err);
      click('input-date') && this.isValid(input, this.VRules.dateOfBirth, 'date of birth', err);
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

  async saveData(): Promise<void> {
    try {
      if (
        this.VRules.name(this.first.value) === true &&
        this.VRules.name(this.last.value) === true &&
        this.VRules.dateOfBirth(this.date.value) === true
      ) {
        await changeDataCustomer([
          { action: 'setFirstName', firstName: `${this.first.value}` },
          { action: 'setLastName', lastName: `${this.last.value}` },
          { action: 'setDateOfBirth', dateOfBirth: `${this.date.value}` },
        ]);
        const userRequest = await sdkClient.apiRoot.me().get().execute();
        sdkClient.userInfo = userRequest.body;
        this.firstName = sdkClient.userInfo.firstName as string;
        this.lastName = sdkClient.userInfo.lastName as string;
        this.dateOfBirth = sdkClient.userInfo.dateOfBirth as string;
        this.first.value = this.firstName;
        this.first.readOnly = true;
        this.last.value = this.lastName;
        this.last.readOnly = true;
        this.date.value = this.dateOfBirth;
        this.date.readOnly = true;
        const arrChange = this.content.querySelectorAll('.change');
        arrChange.forEach((elem) => elem.classList.remove('change'));
        this.saveBtn.classList.add('hide');
        this.showInfo('data');
        const title = document.querySelector("[href='/profile/']") as HTMLElement;
        console.log(title);
        title.textContent = `${this.firstName} ${this.lastName}`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  showInfo(text: string) {
    const info = new Heading(4, 'info-i', `Your ${text} has been successfully changed!`).render();
    this.content.append(info);
    const TIME = 3000;
    setTimeout(() => {
      info.remove();
    }, TIME);
  }
}
