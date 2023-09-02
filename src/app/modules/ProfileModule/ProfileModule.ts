import { Address } from '@commercetools/platform-sdk';
import { changeDataCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import Profile from '../../components/Profile/Profile';
import { hideError } from '../LoginModule/helpers/animation';
import validateEmail from '../LoginModule/helpers/validateEmail';
import isValidInput from '../LoginModule/helpers/validateInput';
import validatePassword from '../LoginModule/helpers/validatePassword';
import ValidationRules from '../RegistrationModule/validation/ValidationRules/ValidationRules';

export default class ProfileModule extends Component {
  render = () => {
    this.content = new Profile().render();
    this.fillPersonalData();
    return this.content;
  };

  VRules = new ValidationRules();

  valid = {
    first: false,
    last: false,
    date: false,
    email: true,
    pass: true,
    code: true,
    streetName: true,
    streetNum: true,
    city: true,
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
    this.content.querySelectorAll('input').forEach((elem) => {
      const el = elem;
      el.readOnly = true;
    });
    this.content.querySelectorAll('select').forEach((elem) => {
      const el = elem;
      el.disabled = true;
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

        click('change-first') && this.changeIcon('change-first', first, firstName, 'save-i', '.errorFirstNew');
        click('change-last') && this.changeIcon('change-last', last, lastName, 'save-i', '.errorLastNew');
        click('change-date') && this.changeIcon('change-date', date, dateOfBirth, 'save-i', '.errorDateNew');
        click('change-email') && this.changeIcon('change-email', mail, email, 'save-e', '.errorMailNew');
        click('change-pass') && this.changeIcon('change-pass', newPass, '', 'save-e', '.errorPassNew');

        click('btnAddNewAddress') && this.addNewAddress();

        if (click('save-info') || click('save-email')) {
          this.valid.first = this.VRules.name(first.value);
          this.valid.last = this.VRules.name(last.value);
          this.valid.date = this.VRules.dateOfBirth(date.value);
          this.valid.email = this.VRules.email(mail.value);
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
      });
    }

    const addresses = sdkClient.userInfo.addresses as Address[];
    const boxes = this.content.querySelectorAll('.box-address');
    boxes.forEach((box, i) => {
      this.fillAddress(box, addresses[i]);
      const address = box;
      address.id = addresses[i].id as string;
    });
  }

  addNewAddress(): void {
    console.log('new addreSS');
  }

  showBlock(elem: HTMLElement, one: HTMLElement, two: HTMLElement, three: HTMLElement): void {
    document.querySelectorAll('.red').forEach((el) => el.classList.remove('red'));
    elem.classList.add('red');
    one.classList.add('show');
    two.classList.remove('show');
    three.classList.remove('show');
  }

  changeIcon(icon: string, input: HTMLInputElement, data: string, save: string, err: string): void {
    const elem = input;
    const svg = this.content.querySelector(`.${icon}`) as HTMLElement;
    const changeNewPassBox = this.content.querySelector('.changeNewPass') as HTMLElement;
    const currPass = this.content.querySelector('.input-curr') as HTMLInputElement;
    const newPass = this.content.querySelector('.input-new') as HTMLInputElement;

    if (svg.classList.contains('change')) {
      svg.classList.remove('change');
      elem.readOnly = true;
      elem.value = data;
      hideError(err);

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
    }

    this.listenInputs(this.content, input, data, save, err);
  }

  listenInputs(doc: Element, input: HTMLInputElement | HTMLSelectElement, data: string, save: string, err: string) {
    const curPass = doc.querySelector('.input-curr') as HTMLInputElement;
    const saveBtn = doc.querySelector(`.${save}`) as HTMLElement;

    input.addEventListener('input', () => {
      const valid = (val: boolean, rules: (i: string) => boolean, text: string, error: string) => {
        const er = doc.querySelector(error) as HTMLElement;
        let isValid = val;
        isValid = rules(input.value);
        console.log('val', isValid);

        if (isValid === false) {
          er.textContent = `•Invalid ${text}`;
          er.style.display = 'block';

          if (input.value === '') {
            er.style.display = 'none';
          }
        } else {
          er.textContent = '';
          er.style.display = 'none';
        }
      };

      const click = (className: string) => input.classList.contains(className);
      input.value !== data ? saveBtn.classList.remove('hide') : saveBtn.classList.add('hide');

      click('input-email') && (this.valid.email = isValidInput(input as HTMLInputElement, err, validateEmail));
      click('input-new') &&
        curPass.value !== '' &&
        (this.valid.pass = isValidInput(input as HTMLInputElement, err, validatePassword));
      click('input-first') && valid(this.valid.first, this.VRules.name, 'FirstName', err);
      click('input-last') && valid(this.valid.last, this.VRules.name, 'LastName', err);
      click('input-date') && valid(this.valid.date, this.VRules.dateOfBirth, 'date of birth', err);
      click('input-postalcode') && valid(this.valid.code, this.VRules.postalCode, 'postal code', err);
      click('input-city') && valid(this.valid.city, this.VRules.city, 'city name', err);
      click('input-street-name') && valid(this.valid.streetName, this.VRules.street, 'street name', err);
      click('input-street-num') && valid(this.valid.streetNum, this.VRules.street, 'house number', err);
    });
  }

  fillAddress(doc: Element, address: Address): void {
    const countrySelect = doc.querySelector('.select-country') as HTMLSelectElement;
    const postalCodeInput = doc.querySelector('.input-postalcode') as HTMLInputElement;
    const cityInput = doc.querySelector('.input-city') as HTMLInputElement;
    const streetNameInput = doc.querySelector('.input-street-name') as HTMLInputElement;
    const streetNumInput = doc.querySelector('.input-street-num') as HTMLInputElement;
    const saveBtn = doc.querySelector('.save-a') as HTMLElement;
    const defs = doc.querySelectorAll('.default');
    const allInput = doc.querySelectorAll('input');
    const eCity = doc.querySelector('.errorCity') as HTMLElement;
    const eStreetName = doc.querySelector('.errorStreetName') as HTMLElement;
    const eStreetNum = doc.querySelector('.errorStreetNum') as HTMLElement;
    const eCode = doc.querySelector('.errorCode') as HTMLElement;

    const hideErr = (e: HTMLElement) => {
      const error = e;
      error.textContent = '';
      error.style.display = 'none';
    };

    const { city, country, id, key, postalCode, streetName, streetNumber } = address;

    if (city && country && id && postalCode && streetName && streetNumber) {
      countrySelect.value = country;
      postalCodeInput.value = postalCode;
      cityInput.value = city;
      streetNameInput.value = streetName;
      streetNumInput.value = streetNumber;
      const boxAddress = doc;
      boxAddress.id = id;

      key === 'KeyShipping' && this.highlightAddressType(doc, '.shipping-item');
      key === 'KeyBilling' && this.highlightAddressType(doc, '.billing-item');

      this.listenAddressInput(cityInput, city, saveBtn);
      this.listenAddressInput(countrySelect, country, saveBtn);
      this.listenAddressInput(postalCodeInput, postalCode, saveBtn);
      this.listenAddressInput(streetNameInput, streetName, saveBtn);
      this.listenAddressInput(streetNumInput, streetNumber, saveBtn);

      this.listenInputs(doc, cityInput, city, 'save-a', '.errorCity');
      this.listenInputs(doc, postalCodeInput, postalCode, 'save-a', '.errorCode');
      this.listenInputs(doc, streetNameInput, streetName, 'save-a', '.errorStreetName');
      this.listenInputs(doc, streetNumInput, streetNumber, 'save-a', '.errorStreetNum');

      doc.addEventListener('click', (e) => {
        const el = e.target as HTMLElement;

        if (el.classList.contains('svg')) {
          if (el.classList.contains('change')) {
            el.classList.remove('change');
            defs.forEach((d) => {
              const def = d;
              def.classList.remove('add');
              def.querySelectorAll<HTMLInputElement>('input[type=checkbox]').forEach((checkbox) => {
                const check = checkbox;
                check.checked = false;
              });
            });
            allInput.forEach((x) => {
              const input = x;
              input.readOnly = true;
            });
            countrySelect.disabled = true;
            countrySelect.value = country;
            postalCodeInput.value = postalCode;
            cityInput.value = city;
            streetNameInput.value = streetName;
            streetNumInput.value = streetNumber;
            hideErr(eCity);
            hideErr(eCode);
            hideErr(eStreetName);
            hideErr(eStreetNum);
            saveBtn.classList.add('hide');
          } else {
            el.classList.add('change');
            defs.forEach((d) => {
              const def = d;
              def.classList.add('add');
            });
            doc.querySelectorAll<HTMLInputElement>('input[type=checkbox]').forEach((checkbox) => {
              const check = checkbox;
              check.addEventListener('change', () => {
                check.checked === true ? saveBtn.classList.remove('hide') : saveBtn.classList.add('hide');
              });
            });
            allInput.forEach((x) => {
              const input = x;
              input.readOnly = false;
            });
            allInput[2].focus();
            countrySelect.disabled = false;
          }
        }

        if (el.classList.contains('close')) {
          doc.classList.add('hidden');
          const addressId = doc.id;
          changeDataCustomer([
            {
              action: 'removeAddress',
              addressId: `${addressId}`,
            },
          ]);
        }
      });
    }
  }

  listenAddressInput(input: HTMLInputElement | HTMLSelectElement, data: string, save: HTMLElement) {
    input.addEventListener('input', () => {
      input.value !== data ? save.classList.remove('hide') : save.classList.add('hide');
    });
  }

  highlightAddressType(doc: Element, el: string): void {
    const type = doc.querySelector(el) as HTMLElement;
    type.style.color = 'rgb(193, 12, 153)';
    type.style.borderBottom = '1px solid white';
  }
}
