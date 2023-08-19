import getProject from '../../api/Client';
import Component from '../../components/Component';
import DesktopHeader from '../../components/DesktopHeader/DesktopHeader';
import ElementCreator from '../../utils/ElementCreator';

export default class PageHeader extends Component {
  init() {
    getProject();
  }

  render = () => {
    this.content = new ElementCreator({ tag: 'header' }).getElement();
    this.content.appendChild(new DesktopHeader().render());
    const burger = this.content.querySelector('.burger-btn');
    if (burger) {
      burger.addEventListener('click', () => {
        const menu = this.content.querySelector('.nav-desktop');
        if (menu) {
          menu.classList.toggle('show');
          burger.classList.toggle('show');
        }
      });
    }
    return this.content;
  };
}
