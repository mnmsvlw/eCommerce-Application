import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Link extends Component {
  href: string;

  classNames?: string;

  text?: string;

  constructor(href: string, classNames?: string, text?: string) {
    super();
    this.href = href;
    this.classNames = classNames;
    this.text = text;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'a',
      classNames: this.classNames,
      text: this.text,
      attributes: {
        href: this.href,
        id: this.id,
      },
    }).getElement();
    return this.content;
  };
}
