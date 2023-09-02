import Button from '../../UI/Button';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Input from '../../UI/Input';
import Label from '../../UI/Label';
import Component from '../Component';

export default class ProfileEmailPass extends Component {
  render = () => {
    this.content = new Container('wrapper-email').render();
    const header = new Heading(3, 'headerPage', 'Email and password').render();
    const formErrorMail = new Container('errorMailNew').render();
    const formErrorPass = new Container('errorPassNew').render();
    const emailBox = new Container('email').render();
    const emailLabel = new Label('email', 'Email', 'label').render();
    const emailInput = new Input('email', 50, 'input-email', '', 'text').render();
    emailBox.append(emailLabel, emailInput, formErrorMail);
    const svg1 = new Container('change-email').render();
    const boxForEmail = new Container('form-email').render();
    boxForEmail.append(emailBox, svg1);
    const passBox = new Container('pass').render();
    const passLabel = new Label('pass', 'Password', 'label').render();
    const passInput = new Input('pass', 50, 'input-pass', '', 'text').render();
    const currentPassLabel = new Label('current', 'Enter your password', 'label-cur').render();
    const currentPassInput = new Input('current', 50, 'input-curr', '', 'password').render();
    const newPassLabel = new Label('new', 'Enter new password', 'label-new').render();
    const newPassInput = new Input('new', 50, 'input-new', '', 'password').render();
    const changePass = new Container('changeNewPass').render();
    changePass.append(currentPassLabel, currentPassInput, newPassLabel, newPassInput, formErrorPass);
    passBox.append(passLabel, passInput, changePass);
    const svg2 = new Container('change-pass').render();
    const boxForPass = new Container('form-email').render();

    boxForPass.append(passBox, svg2);

    const boxSave = new Container('save-e').render();
    const btnSave = new Button('Save', 'submit', 'save-email').render();
    boxSave.append(btnSave);
    boxSave.classList.add('hide');
    this.content.append(header, boxForEmail, boxForPass, boxSave);

    return this.content;
  };
}
