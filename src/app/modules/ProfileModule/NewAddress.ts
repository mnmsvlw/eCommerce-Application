import { AddressReg } from '../../../types/registrationTypes';
import { changeDataCustomer } from '../../api/authorization/Customer';
import Component from '../../components/Component';
import ProfileAddress from '../../components/Profile/ProfileAddress';
import Button from '../../UI/Button';
import Container from '../../UI/Container';
import ValidationRules from '../RegistrationModule/validation/ValidationRules/ValidationRules';

export default class NewAddressModule extends Component {
  render = () => {
    this.content = new ProfileAddress().render();
    this.fillData(this.content);
    return this.content;
  };

  svgBox!: HTMLElement;

  VRules: ValidationRules = new ValidationRules();

  countrySelect!: HTMLSelectElement;

  postalCodeInput!: HTMLInputElement;

  cityInput!: HTMLInputElement;

  streetNameInput!: HTMLInputElement;

  streetNumInput!: HTMLInputElement;

  arrChecked: HTMLInputElement[] = [];

  fillData(content: HTMLElement): void {
    content.classList.add('width');
    this.svgBox = content.querySelector('.box-svg') as HTMLElement;
    const svg = content.querySelector('.svg') as HTMLElement;
    svg.classList.add('hidden');
    this.svgBox.classList.add('show');
    const boxSave = new Container('save-an').render();
    const btnSave = new Button('Save', 'submit', 'save-new').render();
    this.svgBox.append(boxSave);
    boxSave.append(btnSave);
    const title = content.querySelector('.title') as HTMLElement;
    title.textContent = '';
    const type = content.querySelector('.conteinerType') as HTMLElement;
    type.textContent = '';
    const defs = content.querySelectorAll('.default');
    defs.forEach((def) => {
      def.classList.add('add');
      def.classList.add('width');
      const check = def.querySelector('input[type=checkbox]') as HTMLInputElement;
      this.arrChecked.push(check);
    });
    const select = content.querySelector('.select-country') as HTMLSelectElement;
    select.value = 'GE';
    this.countrySelect = content.querySelector('.select-country') as HTMLSelectElement;
    this.postalCodeInput = content.querySelector('.input-postalcode') as HTMLInputElement;
    this.cityInput = content.querySelector('.input-city') as HTMLInputElement;
    this.streetNameInput = content.querySelector('.input-street-name') as HTMLInputElement;
    this.streetNumInput = content.querySelector('.input-street-num') as HTMLInputElement;
    this.listenField(content);
  }

  listenField(doc: Element) {
    this.listenInputs(doc, this.cityInput, '.errorCity');
    this.listenInputs(doc, this.postalCodeInput, '.errorCode');
    this.listenInputs(doc, this.streetNameInput, '.errorStreetName');
    this.listenInputs(doc, this.streetNumInput, '.errorStreetNum');

    doc.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains('close')) {
        const btnLink = document.querySelector('.address-item') as HTMLButtonElement;
        btnLink.click();
      }

      el.classList.contains('save-new') && this.saveAddress();
    });
    doc.addEventListener('input', () => {
      const isValidCity = this.VRules.city(this.cityInput.value);
      const isValidStreetName = this.VRules.city(this.streetNameInput.value);
      const isValidStreetNum = this.VRules.house(this.streetNumInput.value);
      const isValidCode = this.VRules.postalCode(this.postalCodeInput.value);

      if (isValidCity === true && isValidStreetName === true && isValidStreetNum === true && isValidCode === true) {
        this.svgBox.classList.remove('show');
      } else {
        this.svgBox.classList.add('show');
      }
    });
  }

  listenInputs(doc: Element, input: HTMLInputElement, err: string) {
    input.addEventListener('input', () => {
      const click = (className: string) => input.classList.contains(className);
      click('input-postalcode') && this.isValid(doc, input, this.VRules.postalCode, 'postal code', err);
      click('input-city') && this.isValid(doc, input, this.VRules.city, 'city name', err);
      click('input-street-name') && this.isValid(doc, input, this.VRules.city, 'street name', err);
      click('input-street-num') && this.isValid(doc, input, this.VRules.house, 'house number', err);
    });
  }

  isValid(doc: Element, el: HTMLInputElement, rules: (i: string) => boolean, text: string, error: string): void {
    const er = doc.querySelector(error) as HTMLElement;
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

  async saveAddress() {
    const addressNew = this.fillAddressReg();
    const addedAddress = await changeDataCustomer([{ action: 'addAddress', address: addressNew }], 'address');
    console.log('addedAddress', addedAddress.body.addresses);
    const arrAddresses = addedAddress.body.addresses;
    const lastAddress = arrAddresses[arrAddresses.length - 1];
    console.log('lastAddess', lastAddress);

    if ((this.arrChecked[0] as HTMLInputElement).checked === true) {
      changeDataCustomer(
        [{ action: 'setDefaultShippingAddress', addressId: `${lastAddress?.id}` }],
        '',
        addedAddress.body.version
      );
    }

    if ((this.arrChecked[1] as HTMLInputElement).checked === true) {
      changeDataCustomer(
        [{ action: 'setDefaultBillingAddress', addressId: `${lastAddress?.id}` }],
        '',
        addedAddress.body.version
      );
    }
  }

  fillAddressReg(): AddressReg {
    const MAX = 1000;
    const MIN = 10;
    const ramdomKey = Math.random() * (MAX - MIN) + MIN;
    const address: AddressReg = {
      key: `${this.countrySelect.value}${ramdomKey}`,
      streetName: `${this.streetNameInput.value}`,
      streetNumber: `${this.streetNumInput.value}`,
      postalCode: `${this.postalCodeInput.value}`,
      city: `${this.cityInput.value}`,
      country: `${this.countrySelect.value}`,
    };
    return address;
  }
}
