import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class Form extends Component {
  classNames?: string;

  action: string;

  method: string;

  constructor(action: string, method = 'post', classNames?: string) {
    super();
    this.classNames = classNames;
    this.action = action;
    this.method = method;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'form',
      classNames: this.classNames,
      attributes: {
        action: this.action,
        method: this.method,
        id: this.id,
      },
    }).getElement();
    return this.content;
  };
}
