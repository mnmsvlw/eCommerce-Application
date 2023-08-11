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
    return this.content;
  };
}
