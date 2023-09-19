import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Button extends Component {
  classNames?: string;

  type: string;

  text: string;

  constructor(text: string, type = 'submit', classNames?: string) {
    super();
    this.classNames = classNames;
    this.type = type;
    this.text = text;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'button',
      classNames: this.classNames,
      attributes: {
        type: this.type,
        id: this.id,
      },
      text: this.text,
    }).getElement();
    return this.content;
  };
}
