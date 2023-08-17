import Container from '../../../UI/Container';
import Heading from '../../../UI/Heading';
import Link from '../../../UI/Link';
import Component from '../../Component';
import './LogoutForm.css';

export default class LogoutForm extends Component {
  render = () => {
    this.content = new Container('wrapperLogaut').render();
    const text = 'Are you sure you want logout?';
    const formHeader = new Heading(2, 'logoutForm-header', text).render();
    const box = new Container('btn-container').render();
    const noBtn = new Link('/', 'noBtn', 'NO').render();
    const yesBtn = new Link('/login/', 'yesBtn', 'YES').render();
    box.append(noBtn, yesBtn);
    this.content.append(formHeader, box);
    return this.content;
  };
}
