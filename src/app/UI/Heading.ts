import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Heading extends Component {
  tag: string;

  classNames?: string;

  text?: string;

  constructor(tag: number, classNames?: string, text?: string) {
    super();
    this.tag = `h${tag.toString()}`;
    this.classNames = classNames;
    this.text = text;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: this.tag,
      classNames: this.classNames,
      text: this.text,
    }).getElement();
    return this.content;
  };
}
