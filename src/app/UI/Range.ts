import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Range extends Component {
  classNames?: string;

  min: number;

  max: number;

  constructor(min: number, max: number, classNames?: string) {
    super();
    this.min = min;
    this.max = max;
    this.classNames = classNames;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'input',
      classNames: this.classNames,
      attributes: {
        type: 'range',
        min: this.min,
        max: this.max,
        id: this.id,
      },
    }).getElement();
    return this.content;
  };
}
