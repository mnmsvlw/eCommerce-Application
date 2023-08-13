import './RegistrationForm.css';
import ElementCreator from '../../utils/ElementCreator';
import Component from '../Component';
import Input from '../../UI/Input';
import Label from '../../UI/Label';
import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Container from '../../UI/Container';

export default class RegistrationForm extends Component {
  render = () => {
    this.content = new Form('insert action here', 'post', 'regform').render();
    const formContainer = new Container('regform-container').render();

    const formHeader = new ElementCreator({ tag: 'h2', classNames: 'regform-header', text: 'Register' }).getElement();
    const formInstruction = new ElementCreator({
      tag: 'p',
      classNames: 'regform-text',
      text: 'Please fill in this form to create an account.',
    }).getElement();

    const emailLabel = new Label('regemail', 'Email', 'regform-label').render();
    const emailInput = new Input('regemail', 20, 'regform-input', '', 'email').render();

    const passwordLabel = new Label('regpassword', 'Password', 'regform-label').render();
    const passwordInput = new Input('regpassword', 20, 'regform-input', '', 'password').render();

    const firstNameLabel = new Label('regFirstName', 'First name', 'regform-label').render();
    const firstNameInput = new Input('regFirstName', 20, 'regform-input').render();

    const lastNameLabel = new Label('regLastName', 'Last name', 'regform-label').render();
    const lastNameInput = new Input('regLastName', 20, 'regform-input').render();

    const dateOfBirthLabel = new Label('regBirthDay', 'Date of birth', 'regform-label').render();
    const dateOfBirthInput = new Input('regBirthDay', 20, 'regform-input', '', 'date').render();

    const addressContainer = new Container('regform-container__address').render();

    const addressHeader = new ElementCreator({
      tag: 'p',
      classNames: 'regform-adress__header',
      text: 'Address',
    }).getElement();

    const streetLabel = new Label('regstreet', 'Street', 'regform-label').render();
    const streetInput = new Input('regstreet', 20, 'regform-input').render();

    const cityLabel = new Label('regcity', 'City', 'regform-label').render();
    const cityInput = new Input('regcity', 20, 'regform-input').render();

    const postalCodeLabel = new Label('regpostalcode', 'Postal code', 'regform-label').render();
    const postalCodeInput = new Input('regpostalcode', 20, 'regform-input').render();

    const countryLabel = new Label('regcountry', 'Country', 'regform-label').render();
    const countryInput = new Input('regcountry', 20, 'regform-input').render();

    addressContainer.append(
      addressHeader,
      streetLabel,
      streetInput,
      cityLabel,
      cityInput,
      postalCodeLabel,
      postalCodeInput,
      countryLabel,
      countryInput
    );

    const regButton = new Button('Register', 'submit', 'regform-btn').render();

    formContainer.append(
      formHeader,
      formInstruction,
      emailLabel,
      emailInput,
      passwordLabel,
      passwordInput,
      firstNameLabel,
      firstNameInput,
      lastNameLabel,
      lastNameInput,
      dateOfBirthLabel,
      dateOfBirthInput,
      addressContainer,
      regButton
    );

    this.content.appendChild(formContainer);
    return this.content;
  };
}
