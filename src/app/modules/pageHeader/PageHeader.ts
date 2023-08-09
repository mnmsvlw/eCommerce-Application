import getProject from '../../api/Client';
import DesktopHeader from '../../components/DesktopHeader/DesktopHeader';

export default class PageHeader {
  element: HTMLElement;

  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const header = new DesktopHeader();
    return header.render();
  }

  render() {
    return this.element;
  }
}
