import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Input extends Component {
  classNames?: string;

  type: string;

  inputName: string;

  inputPlaceholder: string;

  inputSize: number;

  constructor(inputName: string, inputSize: number, classNames?: string, inputPlaceholder = '', type = 'text') {
    super();
    this.classNames = classNames;
    this.type = type;
    this.inputName = inputName;
    this.inputSize = inputSize;
    this.inputPlaceholder = inputPlaceholder;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'input',
      classNames: this.classNames,
      attributes: {
        type: this.type,
        name: this.inputName,
        size: this.inputSize.toString(),
        placeholder: this.inputPlaceholder,
        id: this.id,
      },
    }).getElement();
    return this.content;
  };
}
