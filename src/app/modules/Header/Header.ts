import Component from '../../components/Component';
import DesktopHeader from '../../components/DesktopHeader/DesktopHeader';
import ElementCreator from '../../utils/ElementCreator';

export default class Header extends Component {
  render = () => {
    this.content = new ElementCreator({ tag: 'header' }).getElement();
    this.content.appendChild(new DesktopHeader().render());
    return this.content;
  };
}
