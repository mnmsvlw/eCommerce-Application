import './DesktopHeader.css';
import ElementCreator from '../../utils/ElementCreator';
import { navItemsAuthorized, navItemsUnauthorized } from '../../data/navItems';
import Component from '../Component';
import Link from '../../UI/Link';
import sdkClient from '../../api/SdkClient';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import redirect from '../../utils/redirect';

export default class DesktopHeader extends Component {
  linkOnClick = (e: Event) => {
    e.preventDefault();
    const tar = e.target as HTMLElement;
    const path = tar.getAttribute('href') as string;
    redirect(path);
  };

  render = () => {
    this.content = new Container('wrapp').render();
    const logo = new Link('/', 'logo', 'SneakPeak');
    logo.addListener('click', this.linkOnClick);
    const container = new ElementCreator({ tag: 'nav', classNames: 'nav-desktop' }).getElement();
    const ul = new ElementCreator({ tag: 'ul', classNames: 'nav-list' }).getElement();
    const navItems = sdkClient.isAuthorizedUser ? navItemsAuthorized : navItemsUnauthorized;
    navItems.forEach((item) => {
      const li = new ElementCreator({ tag: 'li', classNames: 'nav-item' }).getElement();
      let linkElement: Link | Heading;

      if (item.title === 'Profile') {
        linkElement = new Link(item.href, 'nav-link', `${sdkClient.userInfo.firstName} ${sdkClient.userInfo.lastName}`);
      } else {
        linkElement = new Link(item.href, 'nav-link', item.title);
      }

      linkElement.addListener('click', this.linkOnClick);

      li.appendChild(linkElement.render());
      ul.appendChild(li);
    });
    const burger = new Container('burger-btn').render();
    const span1 = new ElementCreator({ tag: 'span', classNames: 'span' }).getElement();
    const span2 = new ElementCreator({ tag: 'span', classNames: 'span' }).getElement();
    const span3 = new ElementCreator({ tag: 'span', classNames: 'span' }).getElement();
    burger.append(span1, span2, span3);
    container.appendChild(ul);
    this.content.append(logo.render(), container, burger);

    return this.content;
  };
}
