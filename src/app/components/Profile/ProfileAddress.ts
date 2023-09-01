import { OptionKeyValuePair } from '../../../types/registrationTypes';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Label from '../../UI/Label';
import ElementCreator from '../../utils/ElementCreator';
import Component from '../Component';
import Select from '../../UI/Select';
import Input from '../../UI/Input';

export default class ProfileAddress extends Component {
  render = () => {
    this.content = new Container('box-address').render();
    const title = new Heading(4, 'title', 'Address').render();
    const close = new Container('close').render();

    const conteinerType = new Container('conteinerType').render();
    const type = new ElementCreator({ tag: 'p', classNames: 'type-item', text: 'Type :' }).getElement();
    const shipping = new ElementCreator({ tag: 'p', classNames: 'shipping-item', text: 'Shipping' }).getElement();
    const billing = new ElementCreator({ tag: 'p', classNames: 'billing-item', text: 'Billing' }).getElement();
    conteinerType.append(type, shipping, billing);

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
    postalCode.append(postalCodeLabel, postalCodeInput);
    countryPostalCode.append(country, postalCode);

    const cityLabel = new Label('city', 'City', 'label-city').render();
    const cityInput = new Input('city', 50, 'input-city').render();
    const streetLabel = new Label('street', 'Street', 'label-street').render();
    const streetInput = new Input('street', 50, 'input-street').render();

    const shippingLabel = new Label('shippingLabel', 'Default Address', 'check-label').render();
    const shippingInput = new Input('shippingLabel', 0, 'check-input', '', 'checkbox').render();

    const toggle1 = new Container('toggle1').render();
    const switch1 = new Container('switch1').render();
    switch1.classList.add('s');
    const track1 = new Container('track1').render();
    track1.classList.add('s');
    toggle1.append(shippingInput, switch1, track1);
    const boxSvg = new Container('box-svg').render();
    const svg = new Container('svg').render();
    boxSvg.append(svg);
    const boxForDefault1 = new Container('default').render();
    boxForDefault1.append(shippingLabel, toggle1);

    this.content.append(
      title,
      close,
      conteinerType,
      countryPostalCode,
      cityLabel,
      cityInput,
      streetLabel,
      streetInput,
      boxForDefault1,
      boxSvg
    );
    return this.content;
  };
}
