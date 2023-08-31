import { Image } from '@commercetools/platform-sdk';
import Component from '../../Component';
import ElementCreator from '../../../utils/ElementCreator';
import Container from '../../../UI/Container';
import 'swiper/css/bundle';
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
      const img = new ElementCreator({
        tag: 'img',
        attributes: {
          src: this.images[0].url,
          alt: 'slide-image',
        },
      }).getElement();
      this.content.append(img);
      return this.content;
    }

    this.content = new Container('swiper').render();

    const swiperWrapper = new ElementCreator({
      tag: 'div',
      classNames: 'swiper-wrapper',
    }).getElement();

    this.images.forEach((image) => {
      const swiperSlide = new ElementCreator({
        tag: 'div',
        classNames: 'swiper-slide',
      }).getElement();

      const imageElement = new ElementCreator({
        tag: 'img',
        attributes: {
          src: image.url,
          alt: 'slide-image',
        },
      }).getElement();

      swiperSlide.appendChild(imageElement);
      swiperWrapper.appendChild(swiperSlide);
    });

    const swiperPagination = new Container('swiper-pagination').render();
    const swiperButtonPrev = new Container('swiper-button-prev').render();
    const swiperButtonNext = new Container('swiper-button-next').render();

    this.content.append(swiperWrapper, swiperPagination, swiperButtonPrev, swiperButtonNext);
    return this.content;
  };
}
