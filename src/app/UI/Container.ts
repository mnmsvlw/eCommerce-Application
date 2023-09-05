import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Container extends Component {
  classNames?: string;

  text?: string;

  constructor(classNames?: string, text?: string) {
    super();
    this.classNames = classNames;
    this.text = text;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'div',
      classNames: this.classNames,
      attributes: {
        id: this.id,
      },
      text: this.text,
    }).getElement();
    return this.content;
  };
}
