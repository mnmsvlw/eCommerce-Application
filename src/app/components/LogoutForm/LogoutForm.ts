import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Link from '../../UI/Link';
import Component from '../Component';
import './LogoutForm.css';

export default class LogoutForm extends Component {
  render = () => {
    this.content = new Container('wrapperLogaut').render();
    const formContainer = new Container('logoutForm-container').render();
    const text = 'Are you sure you want logout?';
    const formHeader = new Heading(3, 'logoutForm-header', text).render();
    const box = new Container('btn-container').render();
    const noBtn = new Link('/', 'noBtn', 'NO').render();
    const yesBtn = new Link('/login/', 'yesBtn', 'YES').render();
    box.append(noBtn, yesBtn);
    formContainer.append(formHeader, box);
    this.content.append(formContainer);
    return this.content;
  };
}
