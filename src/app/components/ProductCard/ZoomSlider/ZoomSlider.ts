import { Image } from '@commercetools/platform-sdk';
import Component from '../../Component';
import Container from '../../../UI/Container';
import ImageElement from '../../../UI/Img';
import './ZoomSlider.css';

export default class ZoomProductSlider extends Component {
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

    this.content = new Container('zoom-swiper').render();

    const swiperWrapper = new Container('swiper-wrapper').render();

    this.images.forEach((image) => {
      const swiperSlide = new Container('swiper-slide').render();
      const imageElement = new ImageElement(image.url, 'slide-image').render();
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
