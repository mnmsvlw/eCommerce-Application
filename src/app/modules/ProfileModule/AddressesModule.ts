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

    console.log('addresses', addresses);
    console.log('bill', sdkClient.userInfo.billingAddressIds);
    console.log('defbill', sdkClient.userInfo.defaultBillingAddressId);
    console.log('shill', sdkClient.userInfo.shippingAddressIds);
    console.log('defshill', sdkClient.userInfo.defaultShippingAddressId);
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

    const { city, country, id, key, postalCode, streetName, streetNumber } = address;

    const data = { city, country, id, key, postalCode, streetName, streetNumber };

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

      key === 'KeyShipping' && this.highlightAddressType(doc, '.shipping-item');
      key === 'KeyBilling' && this.highlightAddressType(doc, '.billing-item');

      this.showSaveBtn(cityInput, city, saveBtn);
      this.showSaveBtn(countrySelect, country, saveBtn);
      this.showSaveBtn(postalCodeInput, postalCode, saveBtn);
      this.showSaveBtn(streetNameInput, streetName, saveBtn);
      this.showSaveBtn(streetNumInput, streetNumber, saveBtn);

      this.listenInputs(data, doc, cityInput, '.errorCity');
      this.listenInputs(data, doc, postalCodeInput, '.errorCode');
      this.listenInputs(data, doc, streetNameInput, '.errorStreetName');
      this.listenInputs(data, doc, streetNumInput, '.errorStreetNum');

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
            this.hideErr(eCity);
            this.hideErr(eCode);
            this.hideErr(eStreetName);
            this.hideErr(eStreetNum);
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

        el.classList.contains('close') && this.removeAddress(doc);
        el.classList.contains('save-address') && this.changeAddress(doc);
      });
    }
  }

  listenInputs(data: Address, doc: Element, input: HTMLInputElement, err: string) {
    const countrySelect = doc.querySelector('.select-country') as HTMLSelectElement;
    const postalCodeInput = doc.querySelector('.input-postalcode') as HTMLInputElement;
    const cityInput = doc.querySelector('.input-city') as HTMLInputElement;
    const streetNameInput = doc.querySelector('.input-street-name') as HTMLInputElement;
    const streetNumInput = doc.querySelector('.input-street-num') as HTMLInputElement;
    const saveBtn = doc.querySelector('.save-a') as HTMLElement;
    input.addEventListener('input', () => {
      if (
        countrySelect.value !== data.country ||
        postalCodeInput.value !== data.postalCode ||
        cityInput.value !== data.city ||
        streetNameInput.value !== data.streetName ||
        streetNumInput.value !== data.streetNumber
      ) {
        saveBtn.classList.remove('hide');
      } else {
        saveBtn.classList.add('hide');
      }

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

  showSaveBtn(input: HTMLInputElement | HTMLSelectElement, data: string, save: HTMLElement) {
    input.addEventListener('input', () => {
      input.value !== data ? save.classList.remove('hide') : save.classList.add('hide');
    });
  }

  highlightAddressType(doc: Element, el: string): void {
    const type = doc.querySelector(el) as HTMLElement;
    type.style.color = 'rgb(193, 12, 153)';
    type.style.borderBottom = '1px solid white';
  }

  addNewAddress(): void {
    this.content.textContent = '';
    const header = new Heading(3, 'headerPage', 'Enter Addresses').render();
    const conteiner = new Container('conteiner').render();
    const box = new NewAddressModule().render();
    conteiner.append(box);
    this.content.append(header, conteiner);
  }

  async removeAddress(doc: Element) {
    try {
      doc.classList.add('hidden');
      const addressId = doc.id;
      await changeDataCustomer([{ action: 'removeAddress', addressId: `${addressId}` }]);
      this.showInfo(doc, 'Your address has been successfully deleted!');
    } catch (error) {
      console.log(error);
    }
  }

  async changeAddress(doc: Element) {
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
        // const def = doc.querySelectorAll<HTMLInputElement>('input[type=checkbox]');
        // const defShipp = def[0].checked;
        // const defBill = def[1].checked;
        const addressChange: Address = {
          streetName: `${streetNameInput.value}`,
          streetNumber: `${streetNumInput.value}`,
          postalCode: `${postalCodeInput.value}`,
          city: `${cityInput.value}`,
          country: `${countrySelect.value}`,
        };

        await changeDataCustomer([{ action: 'changeAddress', addressId: `${doc.id}`, address: addressChange }]);
        this.showInfo(doc, 'Your address has been successfully changed!');
      }
    } catch (error) {
      console.log(error);
    }
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
