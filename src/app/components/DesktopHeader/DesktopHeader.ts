import './DesktopHeader.css';
import Link from '../../UI/Link';
import ElementCreator from '../../utils/ElementCreator';
import navItems from '../../data/navItems';

export default class DesktopHeader {
  header: HTMLElement;

  constructor() {
    this.header = this.createHeader();
  }

  createHeader() {
    const nav = new ElementCreator({ tag: 'nav', classNames: ['nav-desktop'] }).getElement();
    const navUl = new ElementCreator({ tag: 'ul', classNames: ['nav-list'] }).getElement();
    navItems.forEach((item) => {
      const li = new ElementCreator({ tag: 'li', classNames: ['nav-item'] }).getElement();
      const link = new Link(item.href, ['nav-link'], item.title).render();
      li.appendChild(link);
      navUl.appendChild(li);
    });
    nav.appendChild(navUl);
    return nav;
  }

  render() {
    return this.header;
  }
}
