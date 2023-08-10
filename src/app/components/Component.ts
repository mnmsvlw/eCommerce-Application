import { addToEventList } from '../data/listenersList';
import ElementCreator from '../utils/ElementCreator';

export default class Component {
  content: HTMLElement;

  id: string;

  constructor() {
    this.content = new ElementCreator({ tag: 'div' }).getElement();
    this.id = crypto.randomUUID();
    this.init();
  }

  init() {}

  render(..._options: string[]) {
    return this.content;
  }

  addListener(eventType: string, eventListener: (e: Event) => void) {
    addToEventList({ id: this.id, eventType, eventListener });
  }
}
