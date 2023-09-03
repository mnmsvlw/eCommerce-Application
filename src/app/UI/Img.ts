import Component from '../components/Component';
import ElementCreator from '../utils/ElementCreator';

export default class ImageElement extends Component {
  src: string;

  alt?: string;

  classNames?: string;

  constructor(src: string, alt?: string, classNames?: string) {
    super();
    this.src = src;
    this.alt = alt;
    this.classNames = classNames;
  }

  public render = () => {
    this.content = new ElementCreator({
      tag: 'img',
      attributes: {
        src: this.src,
        alt: this.alt || '',
        class: this.classNames || '',
        id: this.id,
      },
    }).getElement();
    return this.content;
  };
}
