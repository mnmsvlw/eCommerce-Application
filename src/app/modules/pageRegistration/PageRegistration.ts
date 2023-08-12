import Component from '../../components/Component';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import ElementCreator from '../../utils/ElementCreator';

export default class PageRegistration extends Component {
  //   init() {

  //   }

  render = () => {
    this.content = new ElementCreator({ tag: 'main', classNames: 'regpage-main' }).getElement();
    this.content.appendChild(new RegistrationForm().render());
    return this.content;
  };
}
