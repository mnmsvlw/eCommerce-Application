import Button from '../../UI/Button';
import Container from '../../UI/Container';
import Form from '../../UI/Form';
import Heading from '../../UI/Heading';
import Input from '../../UI/Input';
import Label from '../../UI/Label';
import Link from '../../UI/Link';
import Component from '../Component';
import './LoginForm.css';

export default class LoginForm extends Component {
  render = () => {
    this.content = new Container('wrapper').render();
    const form = new Form('insert action here', 'post', 'loginForm').render();
    const formContainer = new Container('loginForm-container').render();
    const text = 'Login to your personal account';
    const formHeader = new Heading(3, 'loginForm-header', text).render();

    const formErrorLogin = new Container('errorLogin').render();
    const formErrorMail = new Container('errorMail').render();
    const formErrorPass = new Container('errorPass').render();

    const emailLabel = new Label('loginEmail', 'Email', 'login-label').render();
    const emailInput = new Input('loginEmail', 50, 'email-input', 'Enter your Email', 'text').render();
    const emailBox = new Container('box').render();
    emailBox.append(emailLabel, emailInput);

    // const rememberLabel = new Label('loginRemember', 'Remember me', 'rem-label').render();
    // const rememberInput = new Input('loginRemember', 0, 'rem-input', '', 'checkbox').render();
    const emailContainer = new Container('checkbox-container').render();
    emailContainer.append(emailBox);

    const passwordLabel = new Label('loginPassword', 'Password', 'login-label').render();
    const passwordInput = new Input('loginPass', 50, 'pass-input', 'Enter your Password', 'password').render();
    const passwordBox = new Container('box').render();
    passwordBox.append(passwordLabel, passwordInput);

    const showLabel = new Label('loginShow', 'Show password', 'show-label').render();
    const showInput = new Input('loginShow', 0, 'show-input', '', 'checkbox').render();
    const passwordContainer = new Container('checkbox-container').render();
    passwordContainer.append(passwordBox, showInput, showLabel);

    const btnContainer = new Container('btn-container').render();
    const loginButton = new Button('LOGIN', 'submit', 'loginBtn').render();
    const regBox = new Container('reg-container').render();
    const regText = new Heading(4, 'regText', `Don't have an account?`).render();
    const regBtn = new Link('/register/', 'regBtn', 'Register now').render();

    regBox.append(regText, regBtn);
    btnContainer.append(loginButton);
    form.append(formHeader, formErrorLogin, emailContainer, formErrorMail, passwordContainer, formErrorPass);
    formContainer.append(form, btnContainer, regBox);
    this.content.append(formContainer);

    return this.content;
  };
}
