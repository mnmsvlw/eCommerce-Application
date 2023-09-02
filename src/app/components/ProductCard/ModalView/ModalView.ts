import { Image } from '@commercetools/platform-sdk';
import Container from '../../../UI/Container';
import Component from '../../Component';
import ZoomProductSlider from '../ZoomSlider/ZoomSlider';
import './ModalView.css';

export default class ModalConstructor extends Component {
  private closeButton: HTMLElement | null;

  private modalContent: HTMLElement | null;

  images: Image[];

  constructor(images: Image[]) {
    super();
    this.closeButton = null;
    this.modalContent = null;
    this.images = images;
  }

  public render() {
    this.content = new Container('modal__cover').render();
    this.closeButton = new Container('modal__button').render();
    this.modalContent = new Container('modal').render();
    const zoomSlider = new ZoomProductSlider(this.images).render();
    this.modalContent.append(zoomSlider);

    this.content.classList.add('open');
    this.addEventsListeners();
    this.modalContent.append(this.closeButton);
    this.content.append(this.modalContent);
    return this.content;
  }

  private addEventsListeners(): void {
    if (this.content && this.closeButton) {
      this.content.addEventListener('click', this.handleCoverClick);
      this.closeButton.addEventListener('click', this.handleCloseButtonClick);
    }
  }

  private removeEventsListeners(): void {
    if (this.content && this.closeButton) {
      this.content.removeEventListener('click', this.handleCoverClick);
      this.closeButton.removeEventListener('click', this.handleCloseButtonClick);
    }
  }

  private readonly handleCoverClick = (event: MouseEvent): void => {
    if (event.target === this.content && event.target !== this.modalContent) {
      this.closeModal();
    }
  };

  private readonly handleCloseButtonClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target === this.closeButton || target.closest('.modal__button') === this.closeButton) {
      this.closeModal();
    }
  };

  private closeModal(): void {
    if (this.content) {
      this.content.classList.remove('open');
      this.removeEventsListeners();
    }
  }
}
