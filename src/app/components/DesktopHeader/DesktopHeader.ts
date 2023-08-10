import './DesktopHeader.css';
import ElementCreator from '../../utils/ElementCreator';
import navItems from '../../data/navItems';
import Component from '../Component';
import Link from '../../UI/Link';

export default class DesktopHeader extends Component {
  linkOnClick = (e: Event) => {
    e.preventDefault();
    const tar = e.target as HTMLElement;
    const path = tar.getAttribute('href') as string;
    window.history.pushState(null, '', window.location.origin + path);
    window.dispatchEvent(new Event('popstate'));
  };

  render = () => {
    this.content = new ElementCreator({ tag: 'nav', classNames: 'nav-desktop' }).getElement();
    const ul = new ElementCreator({ tag: 'ul', classNames: 'nav-list' }).getElement();
    navItems.forEach((item) => {
      const li = new ElementCreator({ tag: 'li', classNames: 'nav-item' }).getElement();
      const linkElement = new Link(item.href, 'nav-link', item.title);
      linkElement.addListener('click', this.linkOnClick);
      li.appendChild(linkElement.render());
      ul.appendChild(li);
    });
    this.content.appendChild(ul);
    return this.content;
  };
}
