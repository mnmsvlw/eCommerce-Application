import ElementCreator from '../utils/ElementCreator';

export default class Link {
  linkElement: HTMLElement;

  constructor(href: string, classNames?: string[], text?: string) {
    this.linkElement = this.createElement(href, classNames, text);
  }

  private createElement(href: string, classNames?: string[], text?: string) {
    return new ElementCreator({
      tag: 'a',
      classNames,
      text,
      attributes: {
        href,
      },
    }).getElement();
  }

  public render() {
    return this.linkElement;
  }
}
