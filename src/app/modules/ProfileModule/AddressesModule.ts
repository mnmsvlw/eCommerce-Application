import { Address } from '@commercetools/platform-sdk';
import { changeDataCustomer } from '../../api/authorization/Customer';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import ProfileAllAddresses from '../../components/Profile/PofileAllAddresses';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import ValidationRules from '../RegistrationModule/validation/ValidationRules/ValidationRules';
import NewAddressModule from './NewAddress';

export default class AddressesModule extends Component {
  render = () => {
    this.content = new ProfileAllAddresses().render();
    sessionStorage.setItem('page', 'address');
    this.fillData(this.content);
    this.content.querySelectorAll('select').forEach((elem) => {
      const el = elem;
      el.disabled = true;
    });
    return this.content;
  };

  VRules: ValidationRules = new ValidationRules();

  arrBilling!: string[];

  arrShipping!: string[];

  fillData(content: HTMLElement): void {
    const addresses = sdkClient.userInfo.addresses as Address[];
    const boxes = content.querySelectorAll('.box-address');
    boxes.forEach((box, i) => {
      this.fillAddress(box, addresses[i]);
      const address = box;
      address.id = addresses[i].id as string;
    });
    content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      el.classList.contains('btnAddNewAddress') && this.addNewAddress();
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
    const shippDef = doc.querySelector('.shipping-item-def') as HTMLInputElement;
    const billDef = doc.querySelector('.billing-item-def') as HTMLInputElement;
    const checkboxShip = doc.querySelector('.shipping-input') as HTMLInputElement;
    const checkboxBill = doc.querySelector('.billing-input') as HTMLInputElement;

    const { city, country, id, postalCode, streetName, streetNumber } = address;

    if (city && country && id && postalCode && streetName && streetNumber) {
      countrySelect.value = country;
      postalCodeInput.value = postalCode;
      cityInput.value = city;
      streetNameInput.value = streetName;
      streetNumInput.value = streetNumber;
      const boxAddress = doc;
      boxAddress.id = id;

      allInput.forEach((x) => {
        const input = x;
        input.readOnly = true;
      });

      this.arrBilling = sdkClient.userInfo.billingAddressIds as string[];
      this.arrShipping = sdkClient.userInfo.shippingAddressIds as string[];
      const bill = this.arrBilling?.filter((i) => i === id);
      const ship = this.arrShipping?.filter((i) => i === id);
      bill.length === 1 && this.highlightAddressType(doc, '.billing-item');
      ship.length === 1 && this.highlightAddressType(doc, '.shipping-item');

      const shippId = sdkClient.userInfo.defaultShippingAddressId;
      const billId = sdkClient.userInfo.defaultBillingAddressId;

      if (shippId === id) {
        shippDef.classList.remove('hide');
        checkboxShip.checked = true;
      }

      if (billId === id) {
        billDef.classList.remove('hide');
        checkboxBill.checked = true;
      }

      this.listenInputs(doc, cityInput, '.errorCity');
      this.listenInputs(doc, postalCodeInput, '.errorCode');
      this.listenInputs(doc, streetNameInput, '.errorStreetName');
      this.listenInputs(doc, streetNumInput, '.errorStreetNum');

      doc.addEventListener('click', (e) => {
        const el = e.target as HTMLElement;

        if (el.classList.contains('svg')) {
          if (el.classList.contains('change')) {
            el.classList.remove('change');
            defs.forEach((d) => {
              const def = d;
              def.classList.remove('add');
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
            this.hideErr(eCity);
            this.hideErr(eCode);
            this.hideErr(eStreetName);
            this.hideErr(eStreetNum);
            saveBtn.classList.add('hide');
          } else {
            saveBtn.classList.remove('hide');
            el.classList.add('change');
            defs.forEach((d) => {
              const def = d;
              def.classList.add('add');
            });

            allInput.forEach((x) => {
              const input = x;
              input.readOnly = false;
            });
            allInput[2].focus();
            countrySelect.disabled = false;
          }
        }

        el.classList.contains('close') && this.removeAddress(doc, id);
        el.classList.contains('save-address') && this.changeAddress(doc, id);
      });
    }
  }

  listenInputs(doc: Element, input: HTMLInputElement, err: string) {
    input.addEventListener('input', () => {
      const click = (className: string) => input.classList.contains(className);
      click('input-postalcode') && this.isValid(doc, input, this.VRules.postalCode, 'postal code', err);
      click('input-city') && this.isValid(doc, input, this.VRules.city, 'city name', err);
      click('input-street-name') && this.isValid(doc, input, this.VRules.street, 'street name', err);
      click('input-street-num') && this.isValid(doc, input, this.VRules.street, 'house number', err);
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

  hideErr(e: HTMLElement) {
    const error = e;
    error.textContent = '';
    error.style.display = 'none';
  }

  highlightAddressType(doc: Element, el: string): void {
    const type = doc.querySelector(el) as HTMLElement;
    type.style.borderBottom = '1px solid rgb(193, 12, 153)';
  }

  addNewAddress(): void {
    this.content.textContent = '';
    const header = new Heading(3, 'headerPage', 'Enter Addresses').render();
    const conteiner = new Container('conteiner').render();
    const box = new NewAddressModule().render();
    conteiner.append(box);
    this.content.append(header, conteiner);
  }

  async removeAddress(doc: Element, id: string) {
    try {
      await changeDataCustomer([{ action: 'removeAddress', addressId: `${id}` }]);
      await this.updateUserInfo();
      this.showInfo(doc, 'Your address has been successfully deleted!');
    } catch (error) {
      console.log(error);
    }
  }

  async changeAddress(doc: Element, id: string) {
    try {
      const countrySelect = doc.querySelector('.select-country') as HTMLSelectElement;
      const postalCodeInput = doc.querySelector('.input-postalcode') as HTMLInputElement;
      const cityInput = doc.querySelector('.input-city') as HTMLInputElement;
      const streetNameInput = doc.querySelector('.input-street-name') as HTMLInputElement;
      const streetNumInput = doc.querySelector('.input-street-num') as HTMLInputElement;

      if (
        this.VRules.postalCode(postalCodeInput.value) === true &&
        this.VRules.name(streetNameInput.value) === true &&
        this.VRules.house(streetNumInput.value) === true &&
        this.VRules.city(cityInput.value) === true
      ) {
        const addressChange: Address = {
          streetName: `${streetNameInput.value}`,
          streetNumber: `${streetNumInput.value}`,
          postalCode: `${postalCodeInput.value}`,
          city: `${cityInput.value}`,
          country: `${countrySelect.value}`,
        };

        await changeDataCustomer([{ action: 'changeAddress', addressId: `${id}`, address: addressChange }]);
        await this.updateUserInfo();
        await this.chandeDefoltAddres(doc, id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async chandeDefoltAddres(doc: Element, id: string) {
    const def = doc.querySelectorAll<HTMLInputElement>('input[type=checkbox]');
    const defShipp = def[0].checked;
    const defBill = def[1].checked;

    if (defShipp === true) {
      await changeDataCustomer([{ action: 'setDefaultShippingAddress', addressId: `${id}` }]);
      await this.updateUserInfo();
    } else {
      await changeDataCustomer([{ action: 'removeShippingAddressId', addressId: `${id}` }]);
      await this.updateUserInfo();
    }

    if (defBill === true) {
      await changeDataCustomer([{ action: 'setDefaultBillingAddress', addressId: `${id}` }]);
      await this.updateUserInfo();
    } else {
      await changeDataCustomer([{ action: 'removeBillingAddressId', addressId: `${id}` }]);
      await this.updateUserInfo();
    }

    this.showInfo(doc, 'Your address has been successfully changed!');
  }

  async updateUserInfo() {
    const userRequest = await sdkClient.apiRoot.me().get().execute();
    sdkClient.userInfo = userRequest.body;
  }

  showInfo(doc: Element, text: string) {
    const info = new Heading(6, 'info-a', `${text}`).render();
    doc.append(info);
    const TIME = 3000;
    setTimeout(() => {
      window.location.reload();
      info.remove();
    }, TIME);
  }
}
