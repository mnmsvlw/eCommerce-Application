import Path from '../../../types/enum';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import LogoutForm from '../../components/LogoutForm/LogoutForm';
import redirect from '../../utils/redirect';

export default class LogoutModule extends Component {
  render = () => {
    this.content = new LogoutForm().render();
    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains('noBtn')) {
        e.preventDefault();
        redirect(Path.MAIN_PAGE);
      }

      if (el.classList.contains('yesBtn')) {
        e.preventDefault();
        sdkClient.reset();
        redirect(Path.LOGIN_PAGE);
      }
    });
    return this.content;
  };
}
