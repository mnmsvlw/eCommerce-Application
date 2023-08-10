import { ElementParams } from '../../types/utilTypes';

export default class ElementCreator {
  element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = this.createElement(params);
  }

  public getElement() {
    return this.element;
  }

  private createElement(params: ElementParams) {
    const newElement = document.createElement(params.tag);

    this.setAttributes(newElement, params.attributes);
    this.addClassNames(newElement, params.classNames);
    this.addTextContent(newElement, params.text);

    return newElement;
  }

  private setAttributes(
    element: HTMLElement,
    attr?: {
      [index: string]: string;
    }
  ) {
    if (attr) {
      Object.keys(attr).forEach((at) => {
        element.setAttribute(at, attr[at]);
      });
    }
  }

  private addClassNames(element: HTMLElement, className?: string) {
    if (className) {
      element.classList.add(...className.split(' '));
    }
  }

  private addTextContent(element: HTMLElement, text?: string) {
    if (text) {
      const el = element;
      el.textContent = text;
    }
  }
}
