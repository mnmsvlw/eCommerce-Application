import { Address } from '@commercetools/platform-sdk';
import { changeDataCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import Profile from '../../components/Profile/Profile';
import { hideError, showError } from '../LoginModule/helpers/animation';
import validateEmail from '../LoginModule/helpers/validateEmail';
import isValidInput from '../LoginModule/helpers/validateInput';
import validatePassword from '../LoginModule/helpers/validatePassword';
import ValidationRules from '../RegistrationModule/validation/ValidationRules/ValidationRules';

export default class ProfileModule extends Component {
  render = () => {
    this.content = new Profile().render();
    this.fillPersonalData();
    const addresses = sdkClient.userInfo.addresses as Address[];
    const boxes = this.content.querySelectorAll('.box-address');
    boxes.forEach((box, i) => {
      this.fillAddress(box, addresses[i]);
    });
    return this.content;
  };

  VRules = new ValidationRules();

  valid = {
    first: true,
    last: true,
    date: true,
    email: true,
    pass: true,
  };

  fillPersonalData(): void {
    const boxInfo = this.content.querySelector('.wrapper-personal') as HTMLDivElement;
    const boxEmail = this.content.querySelector('.wrapper-email') as HTMLDivElement;
    const boxAddress = this.content.querySelector('.wrapper-address') as HTMLDivElement;
    const first = this.content.querySelector('.input-first') as HTMLInputElement;
    const last = this.content.querySelector('.input-last') as HTMLInputElement;
    const date = this.content.querySelector('.input-date') as HTMLInputElement;
    const mail = this.content.querySelector('.input-email') as HTMLInputElement;
    const pass = this.content.querySelector('.input-pass') as HTMLInputElement;
    const newPass = this.content.querySelector('.input-new') as HTMLInputElement;
    // const curPass = this.content.querySelector('.input-curr') as HTMLInputElement;
    this.content.querySelectorAll('input').forEach((elem) => {
      const el = elem;
      el.readOnly = true;
    });

    const { firstName, lastName, dateOfBirth, email } = sdkClient.userInfo;

    if (firstName && lastName && dateOfBirth && email) {
      first.value = firstName;
      last.value = lastName;
      date.value = dateOfBirth;
      mail.value = email;
      pass.value = `********`;

      this.content.addEventListener('click', (e) => {
        const el = e.target as HTMLElement;
        const click = (className: string) => el.classList.contains(className);
        click('info-item') && this.showBlock(el, boxInfo, boxEmail, boxAddress);
        click('email-item') && this.showBlock(el, boxEmail, boxInfo, boxAddress);
        click('address-item') && this.showBlock(el, boxAddress, boxEmail, boxInfo);
        click('change-first') && this.changeIcon('change-first', first, firstName, 'save-i');
        click('change-last') && this.changeIcon('change-last', last, lastName, 'save-i');
        click('change-date') && this.changeIcon('change-date', date, dateOfBirth, 'save-i');
        click('change-email') && this.changeIcon('change-email', mail, email, 'save-e');
        click('change-pass') && this.changeIcon('change-pass', newPass, '', 'save-e');

        if (el.classList.contains('save')) {
          this.valid.first === true &&
            this.valid.last === true &&
            this.valid.date === true &&
            this.valid.email === true &&
            changeDataCustomer([
              { action: 'setFirstName', firstName: `${first.value}` },
              { action: 'setLastName', lastName: `${last.value}` },
              { action: 'setDateOfBirth', dateOfBirth: `${date.value}` },
              { action: 'changeEmail', email: `${mail.value}` },
            ]);

          if (this.valid.pass === true) {
            console.log('как отправить новый пароль?!? ))');
          }
        }

        if (el.classList.contains('close')) {
          const a = el.closest('.box-address') as HTMLElement;
          a.classList.add('hidden');
        }

        if (el.classList.contains('svg')) {
          el.classList.toggle('change');
          const doc = el.closest('.box-address') as HTMLElement;
          const rez = el.classList.contains('change');
          doc.querySelectorAll('input').forEach((x) => {
            const elem = x;
            rez ? (elem.readOnly = false) : (elem.readOnly = true);
          });
          const select = doc.querySelector('.select-country') as HTMLSelectElement;
          rez ? (select.disabled = false) : (select.disabled = true);
          const def = doc.querySelector('.default') as HTMLElement;
          rez ? def.classList.add('add') : def.classList.remove('add');
          const input = doc.querySelector('.check-input') as HTMLInputElement;
          input.addEventListener('input', () => {
            const label = doc.querySelector('.check-label') as HTMLLabelElement;
            const address = `Key${label.innerText.split(' ')[0] as string}`;

            if (label.classList.contains(address)) {
              label.classList.remove(address);
            } else {
              label.classList.add(address);
            }
          });
        }
      });
    }
  }

  showBlock(elem: HTMLElement, one: HTMLElement, two: HTMLElement, three: HTMLElement): void {
    document.querySelectorAll('.red').forEach((el) => el.classList.remove('red'));
    elem.classList.add('red');
    one.classList.add('show');
    two.classList.remove('show');
    three.classList.remove('show');
  }

  changeIcon(icon: string, input: HTMLInputElement, data: string, save: string): void {
    const svg = this.content.querySelector(`.${icon}`) as HTMLElement;
    const changeNewPassBox = this.content.querySelector('.changeNewPass') as HTMLElement;
    const currPass = this.content.querySelector('.input-curr') as HTMLInputElement;
    const newPass = this.content.querySelector('.input-new') as HTMLInputElement;

    const elem = input;

    if (svg.classList.contains('change')) {
      svg.classList.remove('change');
      elem.readOnly = true;
      elem.value = data;

      if (icon === 'change-pass') {
        elem.readOnly = true;
        changeNewPassBox.classList.remove('show');
      }
    } else {
      svg.classList.add('change');
      elem.readOnly = false;
      elem.focus();

      if (icon === 'change-pass') {
        elem.readOnly = true;
        changeNewPassBox.classList.add('show');
        currPass.readOnly = false;
        currPass.value = '';
        currPass.focus();
        newPass.readOnly = false;
        newPass.value = '';
      }

      this.listenInputs(input, data, save);
    }
  }

  listenInputs(input: HTMLInputElement, data: string, save: string) {
    const curPass = this.content.querySelector('.input-curr') as HTMLInputElement;
    const saveBtn = this.content.querySelector(`.${save}`) as HTMLElement;
    input.addEventListener('input', () => {
      input.value !== data ? saveBtn.classList.remove('hide') : saveBtn.classList.add('hide');

      if (input.classList.contains('input-email')) {
        this.valid.email = isValidInput(input, '.errorMailNew', validateEmail);
      }

      if (input.classList.contains('input-new') && curPass.value !== '') {
        this.valid.pass = isValidInput(input, '.errorPassNew', validatePassword);
      }

      if (input.classList.contains('input-first')) {
        this.valid.first = this.VRules.name(input.value);

        if (this.valid.first === false) {
          showError('.errorFirstNew', 'Incorrect FirstName', input.value);
        } else {
          hideError('.errorFirstNew');
        }
      }

      if (input.classList.contains('input-last')) {
        this.valid.last = this.VRules.name(input.value);

        if (this.valid.last === false) {
          showError('.errorLastNew', 'Incorrect LastName', input.value);
        } else {
          hideError('.errorLastNew');
        }
      }

      if (input.classList.contains('input-date')) {
        this.valid.date = this.VRules.dateOfBirth(input.value);

        if (this.valid.date === false) {
          showError('.errorDateNew', 'Invalid date of birth', input.value);
        } else {
          hideError('.errorDateNew');
        }
      }
    });
  }

  fillAddress(doc: Element, address: Address): void {
    const countrySelect = doc.querySelector('.select-country') as HTMLSelectElement;
    const code = doc.querySelector('.input-postalcode') as HTMLInputElement;
    const sity = doc.querySelector('.input-city') as HTMLInputElement;
    const street = doc.querySelector('.input-street') as HTMLInputElement;
    doc.querySelectorAll('input').forEach((elem) => {
      const el = elem;
      el.readOnly = true;
    });
    countrySelect.disabled = true;
    const { city, country, id, key, postalCode, streetName, streetNumber } = address;
    countrySelect.value = country;
    code.value = postalCode as string;
    sity.value = city as string;
    street.value = `${streetName} ${streetNumber}`;
    const boxAddress = doc;
    boxAddress.id = id as string;
    const check = doc.querySelector('.check-label') as HTMLLabelElement;
    const text = check.textContent;

    key === 'KeyShipping' && this.highlightAddressType(doc, '.shipping-item', `Billing ${text}`, check);
    key === 'KeyBilling' && this.highlightAddressType(doc, '.billing-item', `Shipping ${text}`, check);
  }

  highlightAddressType(doc: Element, el: string, text: string, elem: HTMLLabelElement): void {
    const type = doc.querySelector(el) as HTMLElement;
    type.style.color = 'rgb(193, 12, 153)';
    type.style.borderBottom = '1px solid white';
    const label = elem;
    label.textContent = text;
  }
}

/* const addAddress = {
  version: sdkClient.userInfo.version as number,
  actions: [
    {
      action: 'addAddress',
      address: {
        streetName: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        country: '',
      },
    },
  ],
}; */
/* sdkClient.apiRoot
              .customers()
              .password()
              .post({
                body: {
                  id: `${sdkClient.userInfo.id}`,
                  version: sdkClient.userInfo.version as number,
                  currentPassword: `${curPass.value}`,
                  newPassword: `${newPass.value}`,
                },
              })
              .execute()
              .then(() => {
                alert(`Password successfully changed!`);
              })
              .catch((err) => {
                console.log(err);
                alert(`Password NO successfully changed!`);
              }); */
