import ElementCreator from '../utils/ElementCreator';

export default class Page {
  page: HTMLElement;

  constructor() {
    this.page = new ElementCreator({ tag: 'div', classNames: 'page-container' }).getElement();
    this.create();
  }

  create() {}

  render() {
    return this.page;
  }
}
