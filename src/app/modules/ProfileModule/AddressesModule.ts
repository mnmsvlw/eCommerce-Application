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

      this.showSaveBtn(cityInput, city, saveBtn);
      this.showSaveBtn(countrySelect, country, saveBtn);
      this.showSaveBtn(postalCodeInput, postalCode, saveBtn);
      this.showSaveBtn(streetNameInput, streetName, saveBtn);
      this.showSaveBtn(streetNumInput, streetNumber, saveBtn);

      this.listenInputs(doc, cityInput, city, '.errorCity');
      this.listenInputs(doc, postalCodeInput, postalCode, '.errorCode');
      this.listenInputs(doc, streetNameInput, streetName, '.errorStreetName');
      this.listenInputs(doc, streetNumInput, streetNumber, '.errorStreetNum');

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

  listenInputs(doc: Element, input: HTMLInputElement, data: string, err: string) {
    const saveBtn = doc.querySelector('.save-a') as HTMLElement;
    input.addEventListener('input', () => {
      input.value !== data ? saveBtn.classList.remove('hide') : saveBtn.classList.add('hide');
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

  removeAddress(doc: Element) {
    doc.classList.add('hidden');
    const addressId = doc.id;
    changeDataCustomer(
      [
        {
          action: 'removeAddress',
          addressId: `${addressId}`,
        },
      ],
      'address'
    );
  }

  changeAddress(doc: Element) {
    const countrySelect = doc.querySelector('.select-country') as HTMLSelectElement;
    const postalCodeInput = doc.querySelector('.input-postalcode') as HTMLInputElement;
    const cityInput = doc.querySelector('.input-city') as HTMLInputElement;
    const streetNameInput = doc.querySelector('.input-street-name') as HTMLInputElement;
    const streetNumInput = doc.querySelector('.input-street-num') as HTMLInputElement;
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

    changeDataCustomer([{ action: 'changeAddress', addressId: `${doc.id}`, address: addressChange }], 'addres');
  }
}
