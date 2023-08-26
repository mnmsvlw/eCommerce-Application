import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Label extends Component {
  classNames?: string;

  labelFor: string;

  text: string;

  constructor(labelFor: string, text: string, classNames?: string) {
    super();
    this.classNames = classNames;
    this.labelFor = labelFor;
    this.text = text;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'label',
      classNames: this.classNames,
      attributes: {
        for: this.labelFor,
        id: this.id,
      },
      text: this.text,
    }).getElement();
    return this.content;
  };
}
