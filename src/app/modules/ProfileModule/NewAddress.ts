import { Address } from '@commercetools/platform-sdk';
import { AddressReg } from '../../../types/registrationTypes';
import { ApiError } from '../../../types/sdkTypes';
import { changeDataCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import ProfileNewAddress from '../../components/Profile/ProfileNewAddress';
import Heading from '../../UI/Heading';
import ValidationRules from '../RegistrationModule/validation/ValidationRules/ValidationRules';
import redirect from '../../utils/redirect';

export default class NewAddressModule extends Component {
  render = () => {
    this.content = new ProfileNewAddress().render();
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

  billing!: HTMLInputElement;

  shipping!: HTMLInputElement;

  shippingDefault!: HTMLInputElement;

  billingDefault!: HTMLInputElement;

  fillData(content: HTMLElement): void {
    this.shipping = content.querySelector('.shipping-input') as HTMLInputElement;
    this.billing = content.querySelector('.billing-input') as HTMLInputElement;
    this.countrySelect = content.querySelector('.select-country') as HTMLSelectElement;
    this.countrySelect.value = 'GE';
    this.postalCodeInput = content.querySelector('.input-postalcode') as HTMLInputElement;
    this.cityInput = content.querySelector('.input-city') as HTMLInputElement;
    this.streetNameInput = content.querySelector('.input-street-name') as HTMLInputElement;
    this.streetNumInput = content.querySelector('.input-street-num') as HTMLInputElement;
    this.svgBox = content.querySelector('.box-svg') as HTMLElement;
    this.shippingDefault = content.querySelector('.shippingDef-input') as HTMLInputElement;
    this.billingDefault = content.querySelector('.billingDef-input') as HTMLInputElement;
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
    try {
      const addedAddress = await changeDataCustomer([{ action: 'addAddress', address: this.fillAddressReg() }]);
      setTimeout(async () => {
        const userRequest = await sdkClient.apiRoot.me().get().execute();
        sdkClient.userInfo = userRequest.body;
        const { addresses } = addedAddress.body;
        const address = addresses[addresses.length - 1] as Address;
        const { id } = address;
        this.billing.checked &&
          (await changeDataCustomer(
            [{ action: 'addBillingAddressId', addressId: `${id}` }],
            sdkClient.userInfo.version as number
          ).catch((error) => console.log(error)));
        this.shipping.checked &&
          (await changeDataCustomer(
            [{ action: 'addShippingAddressId', addressId: `${id}` }],
            sdkClient.userInfo.version as number
          ).catch((error) => console.log(error)));
        this.shippingDefault.checked &&
          (await changeDataCustomer(
            [
              {
                action: 'setDefaultShippingAddress',
                addressId: `${id}`,
              },
            ],
            sdkClient.userInfo.version as number
          ).catch((error) => console.log(error)));
        this.billingDefault.checked &&
          (await changeDataCustomer(
            [
              {
                action: 'setDefaultBillingAddress',
                addressId: `${id}`,
              },
            ],
            sdkClient.userInfo.version as number
          ).catch((error) => console.log(error)));

        this.showInfo('Your new address has been successfully added!');
      }, 1000);
    } catch (error) {
      const apiError = error as ApiError;
      this.showInfo(apiError.message);
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

  showInfo(text: string) {
    const info = new Heading(5, 'info-n', `${text}`).render();
    this.content.append(info);
    const TIME = 3000;
    setTimeout(() => {
      redirect('/profile/');
      info.remove();
    }, TIME);
  }
}
