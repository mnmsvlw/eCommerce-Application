import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Container extends Component {
  classNames?: string;

  constructor(classNames?: string) {
    super();
    this.classNames = classNames;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'div',
      classNames: this.classNames,
    }).getElement();
    return this.content;
  };
}
