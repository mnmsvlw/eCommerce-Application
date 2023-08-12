import Component from '../../components/Component';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default class PageRegistration extends Component {
  //   init() {

  //   }

  render = () => {
    this.content = new RegistrationForm().render();
    return this.content;
  };
}
