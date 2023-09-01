import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import ElementCreator from '../../utils/ElementCreator';
import Component from '../Component';
import ProfileEmailPass from './ProfileEmailPass';
import ProfilePersonalInfo from './ProfilePersonalInfo';
import './Profile.css';

export default class Profile extends Component {
  render = () => {
    this.content = new Container('wrapper-profile').render();
    const menu = new Container('menu').render();
    const foto = new Container('foto').render();
    const profile = new Heading(4, 'profile', 'Profile').render();
    const list = new ElementCreator({ tag: 'ul', classNames: 'list' }).getElement();
    const info = new ElementCreator({ tag: 'li', classNames: 'info-item', text: 'Personal info' }).getElement();
    info.classList.add('red');
    const email = new ElementCreator({ tag: 'li', classNames: 'email-item', text: 'Email and password' }).getElement();
    const addresses = new ElementCreator({ tag: 'li', classNames: 'address-item', text: 'Addresses' }).getElement();
    list.append(info, email, addresses);
    const formBox = new Container('wrapp-form').render();
    const personal = new ProfilePersonalInfo().render();
    const mailPass = new ProfileEmailPass().render();
    formBox.append(personal, mailPass);
    menu.append(foto, profile, list);

    this.content.append(menu, formBox);
    return this.content;
  };
}
