import { ProductProjection } from '@commercetools/platform-sdk';
import { addToEventList } from '../data/listenersList';
import { addToDispatchList } from '../data/mountList';
import ElementCreator from '../utils/ElementCreator';
import { Person } from '../../types/personTypes';

export default class Component {
  content: HTMLElement;

  id: string;

  constructor() {
    this.content = new ElementCreator({ tag: 'div' }).getElement();
    this.id = crypto.randomUUID();
  }

  render(..._options: string[] | ProductProjection[] | Person[]) {
    return this.content;
  }

  renderAsync = async (_component: HTMLElement) => {
    return new Promise((resolve) => {
      resolve(null);
    });
  };

  bindAsync = (renderAsync: (component: HTMLElement) => Promise<void>) => {
    this.addListener('mount', (e: Event) => {
      const target = e.target as HTMLElement;
      renderAsync(target);
    });
    this.addDispatchEvent('mount');
  };

  addListener(eventType: string, eventListener: (e: Event) => void) {
    addToEventList({ id: this.id, eventType, eventListener });
  }

  addDispatchEvent(eventType: string) {
    addToDispatchList({ id: this.id, eventType });
  }
}
