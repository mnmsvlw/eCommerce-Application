import { OptionKeyValuePair } from '../../../types/registrationTypes';
import Button from '../../UI/Button';
import Container from '../../UI/Container';
import Input from '../../UI/Input';
import Label from '../../UI/Label';
import Select from '../../UI/Select';
import Component from '../Component';

export default class ProfileNewAddress extends Component {
  render = () => {
    this.content = new Container('box-address').render();
    this.content.classList.add('width');
    const close = new Container('close').render();

    const formErrorCode = new Container('errorCode').render();
    const formErrorCity = new Container('errorCity').render();
    const formErrorStreetName = new Container('errorStreetName').render();
    const formErrorStreetNum = new Container('errorStreetNum').render();

    const countryPostalCode = new Container('countryPostalCode').render();
    const country = new Container('box-country').render();
    const countryLabel = new Label('country', 'Country', 'label-country').render();
    const countryCodes: { [countryName: string]: string } = {
      Georgia: 'GE',
      Azerbaijan: 'AZ',
      Austria: 'AT',
    };
    const countryOptions: OptionKeyValuePair[] = Object.entries(countryCodes).map(([countryName, countryCode]) => ({
      value: countryCode,
      text: countryName,
    }));
    const countrySelect = new Select('country', countryOptions, 'Select country', 'select-country').render();
    country.append(countryLabel, countrySelect);

    const postalCode = new Container('box-postalCode').render();
    const postalCodeLabel = new Label('postalcode', 'Postal code', 'label-postalcode').render();
    const postalCodeInput = new Input('postalcode', 50, 'input-postalcode', '').render();
    postalCode.append(postalCodeLabel, postalCodeInput, formErrorCode);
    countryPostalCode.append(country, postalCode);

    const cityLabel = new Label('city', 'City', 'label-city').render();
    const cityInput = new Input('city', 50, 'input-city').render();

    const streetNameLabel = new Label('streetName', 'Street name', 'label-street-name').render();
    const streetNameInput = new Input('streetName', 50, 'input-street-name').render();

    const streetNumberLabel = new Label('streetNumber', 'Street number', 'label-street-num').render();
    const streetNumberInput = new Input('streetNumber', 50, 'input-street-num').render();

    const shippingLabel = new Label('shippingLabel', 'Shipping Address', 'shipping-label').render();
    const shippingInput = new Input('shippingLabel', 0, 'shipping-input', '', 'checkbox').render();

    const toggle1 = new Container('toggle1').render();
    const switch1 = new Container('switch1').render();
    switch1.classList.add('s');
    const track1 = new Container('track1').render();
    track1.classList.add('s');
    toggle1.append(shippingInput, switch1, track1);
    const billingLabel = new Label('billingLabel', 'Billing Address', 'billing-label').render();
    const billingInput = new Input('billingLabel', 0, 'billing-input', '', 'checkbox').render();
    const toggle2 = new Container('toggle2').render();
    const switch2 = new Container('switch2').render();
    switch2.classList.add('b');
    const track2 = new Container('track2').render();
    track2.classList.add('b');

    toggle2.append(billingInput, switch2, track2);
    const boxSvg = new Container('box-svg').render();

    const boxForDefault1 = new Container('default').render();
    const boxForDefault2 = new Container('default').render();
    const boxDefs = new Container('defs').render();
    boxDefs.append(boxForDefault1, boxForDefault2);
    boxForDefault1.classList.add('add');
    boxForDefault2.classList.add('add');
    boxForDefault1.classList.add('width');
    boxForDefault2.classList.add('width');
    boxForDefault1.append(shippingLabel, toggle1);
    boxForDefault2.append(billingLabel, toggle2);
    const boxSave = new Container('save-n').render();
    const btnSave = new Button('Save', 'submit', 'save-new').render();
    boxSave.append(btnSave);
    boxSvg.append(boxSave);
    boxSvg.classList.add('show');
    boxSave.classList.add('hide');

    this.content.append(
      close,
      countryPostalCode,
      cityLabel,
      cityInput,
      formErrorCity,
      streetNameLabel,
      streetNameInput,
      formErrorStreetName,
      streetNumberLabel,
      streetNumberInput,
      formErrorStreetNum,
      boxDefs,
      boxSvg
    );
    return this.content;
  };
}
