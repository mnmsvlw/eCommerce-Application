import '../RegistrationForm.css';
import Component from '../../Component';
import Input from '../../../UI/Input';
import Label from '../../../UI/Label';
import Container from '../../../UI/Container';

export default class DataFields extends Component {
  render() {
    const dataContainer = new Container('regform-container__data').render();

    const emailLabel = new Label('regemail', 'Email', 'regform-label').render();
    const emailInput = new Input('regemail', 50, 'regform-input', 'Enter your email', 'text').render();

    const passwordLabel = new Label('regpassword', 'Password', 'regform-label').render();
    const passwordInput = new Input('regpassword', 50, 'regform-input', 'Enter your password', 'password').render();

    const firstNameLabel = new Label('regFirstName', 'First name', 'regform-label').render();
    const firstNameInput = new Input('regFirstName', 50, 'regform-input', 'Enter your name').render();

    const lastNameLabel = new Label('regLastName', 'Last name', 'regform-label').render();
    const lastNameInput = new Input('regLastName', 50, 'regform-input', 'Enter your surname').render();

    const dateOfBirthLabel = new Label('regBirthDay', 'Date of birth', 'regform-label').render();
    const dateOfBirthInput = new Input('regBirthDay', 50, 'regform-input', '', 'date').render();

    dataContainer.append(
      emailLabel,
      emailInput,
      passwordLabel,
      passwordInput,
      firstNameLabel,
      firstNameInput,
      lastNameLabel,
      lastNameInput,
      dateOfBirthLabel,
      dateOfBirthInput
    );

    return dataContainer;
  }
}
