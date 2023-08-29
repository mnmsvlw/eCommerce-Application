import Component from '../../Component';
import ElementCreator from '../../../utils/ElementCreator';
import Container from '../../../UI/Container';
import '@splidejs/splide/css/core';

export default class InnerProductSlider extends Component {
  images: string[];

  constructor(images: string[]) {
    super();
    this.images = images;
  }

  public render = () => {
    this.content = new Container('splide').render();
    this.content.setAttribute('id', 'thumbnail-carousel');

    const trackDiv = new Container('splide__track').render();

    const listUl = new ElementCreator({
      tag: 'ul',
      classNames: 'splide__list',
    }).getElement();

    this.images.forEach((imageSrc) => {
      const slideLi = new ElementCreator({
        tag: 'li',
        classNames: 'splide__slide',
      }).getElement();

      const image = new ElementCreator({
        tag: 'img',
        attributes: {
          src: imageSrc,
          alt: 'slide-image',
        },
      }).getElement();

      slideLi.appendChild(image);
      listUl.appendChild(slideLi);
    });

    trackDiv.appendChild(listUl);
    this.content.appendChild(trackDiv);

    return this.content;
  };
}
