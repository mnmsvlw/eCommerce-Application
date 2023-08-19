import Component from '../../components/Component';
import NotFound from '../../components/NotFound/NotFound';
import changePage from '../LoginModule/helpers/changePage';

export default class NotFoundModule extends Component {
  render = () => {
    this.content = new NotFound().render();
    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains('btnHome')) {
        e.preventDefault();
        changePage('/');
      }
    });
    return this.content;
  };
}
