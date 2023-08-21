import Container from '../UI/Container';

export default class Page {
  page: HTMLElement;

  constructor() {
    this.page = new Container('page-container').render();
    this.create();
  }

  create() {}

  render() {
    return this.page;
  }
}
