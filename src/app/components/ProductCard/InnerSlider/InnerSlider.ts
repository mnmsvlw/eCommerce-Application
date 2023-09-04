import { Image } from '@commercetools/platform-sdk';
import Component from '../../Component';
import Container from '../../../UI/Container';
import ImageElement from '../../../UI/Img';
import ModalConstructor from '../ModalView/ModalView';
import SwiperSlider from '../../../utils/Swiper';
import './InnerSlider.css';

export default class InnerProductSlider extends Component {
  images: Image[];

  constructor(images: Image[]) {
    super();
    this.images = images;
  }

  public render = () => {
    if (this.images.length === 1) {
      this.content = new Container('image-container').render();
      const img = new ImageElement(this.images[0].url, 'slide-image').render();
      this.content.append(img);
      return this.content;
    }

    this.content = new Container('swiper').render();
    const swiperWrapper = new Container('swiper-wrapper').render();

    this.images.forEach((image) => {
      const swiperSlide = new Container('swiper-slide').render();

      const imageHTMLElement = new ImageElement(image.url, 'slide-image').render();
      swiperSlide.appendChild(imageHTMLElement);
      swiperWrapper.appendChild(swiperSlide);
      imageHTMLElement.addEventListener('click', () => {
        const modal: HTMLElement | null = document.querySelector('.modal__cover');

        if (modal != null) {
          modal.remove();
          this.showModal();
        } else {
          this.showModal();
        }
      });
    });

    const swiperPagination = new Container('swiper-pagination').render();
    const swiperButtonPrev = new Container('swiper-button-prev').render();
    const swiperButtonNext = new Container('swiper-button-next').render();

    this.content.append(swiperWrapper, swiperPagination, swiperButtonPrev, swiperButtonNext);
    return this.content;
  };

  showModal = () => {
    const root = document.querySelector('#root') as HTMLBodyElement;
    root.append(new ModalConstructor(this.images).render());
    new SwiperSlider().init('.zoom-swiper');
  };
}
