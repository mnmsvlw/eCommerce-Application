import '../RegistrationForm.css';
import ElementCreator from '../../../utils/ElementCreator';
import Component from '../../Component';
import Input from '../../../UI/Input';
import Label from '../../../UI/Label';
import Container from '../../../UI/Container';
import Select from '../../../UI/Select';

export default class ShippingAddress extends Component {
  render = () => {
    const addressContainer = new Container('regform-container__shipping-address').render();

    const addressHeader = new ElementCreator({
      tag: 'p',
      classNames: 'regform-adress__header',
      text: 'Shipping Address:',
    }).getElement();

    const streetLabel = new Label('regstreet', 'Street', 'regform-label').render();
    const streetInput = new Input('regstreet', 50, 'regform-input').render();

    const cityLabel = new Label('regcity', 'City', 'regform-label').render();
    const cityInput = new Input('regcity', 50, 'regform-input').render();

    const postalCodeLabel = new Label('regpostalcode', 'Postal code', 'regform-label').render();
    const postalCodeInput = new Input('regpostalcode', 50, 'regform-input').render();

    const countryLabel = new Label('regcountry', 'Country', 'regform-label').render();
    const countryList = ['Georgia', 'Armenia', 'Belarus'];
    const countrySelect = new Select('regcountry', countryList, 'Select country', 'regform-select').render();

    const checkboxContainer = new Container('checkbox-container').render();
    const defaultShippingAddressLabel = new Label(
      'ship-checkbox',
      'Make this address the default shipping address?',
      'regform-label'
    ).render();
    const defaultShippingAddress = new Input('ship-checkbox', 5, 'regform-input', '', 'checkbox').render();
    checkboxContainer.append(defaultShippingAddressLabel, defaultShippingAddress);

    const defaultAddressCheckbox = new Container('checkbox-container').render();
    const addBillingAddressLabel = new Label(
      'address-checkbox',
      'Make this address as your billing address?',
      'regform-label'
    ).render();
    const addBillingAddress = new Input('address-checkbox', 5, 'regform-input', '', 'checkbox').render();
    defaultAddressCheckbox.append(addBillingAddressLabel, addBillingAddress);

    addressContainer.append(
      addressHeader,
      streetLabel,
      streetInput,
      cityLabel,
      cityInput,
      postalCodeLabel,
      postalCodeInput,
      countryLabel,
      countrySelect,
      checkboxContainer,
      defaultAddressCheckbox
    );

    return addressContainer;
  };
}
