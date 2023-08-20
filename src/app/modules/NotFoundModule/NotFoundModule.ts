import Path from '../../../types/enum';
import Component from '../../components/Component';
import NotFound from '../../components/NotFound/NotFound';
import redirect from '../../utils/redirect';

export default class NotFoundModule extends Component {
  render = () => {
    this.content = new NotFound().render();
    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains('btnHome')) {
        e.preventDefault();
        redirect(Path.MAIN_PAGE);
      }
    });
    return this.content;
  };
}
