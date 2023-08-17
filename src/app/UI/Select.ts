import { OptionKeyValuePair } from '../../types/registrationTypes';
import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Select extends Component {
  name: string;

  options: OptionKeyValuePair[];

  defaultText: string;

  classNames?: string;

  constructor(name: string, options: OptionKeyValuePair[], defaultText: string, classNames?: string) {
    super();
    this.name = name;
    this.options = options;
    this.classNames = classNames;
    this.defaultText = defaultText;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'select',
      classNames: this.classNames,
      attributes: {
        name: this.name,
        id: this.id,
      },
    }).getElement();

    const defaultOption = new ElementCreator({
      tag: 'option',
      text: this.defaultText,
      attributes: {
        value: '',
        disabled: 'disabled',
        selected: 'selected',
      },
    }).getElement();
    this.content.appendChild(defaultOption);

    this.options.forEach((optionData) => {
      const option = new ElementCreator({
        tag: 'option',
        text: optionData.text,
        attributes: {
          value: optionData.value,
        },
      }).getElement();
      this.content.appendChild(option);
    });
    return this.content;
  };
}
