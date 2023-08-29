import Splide from '@splidejs/splide';
import { ProductResponse } from '../../../types/productTypes';
import Container from '../../UI/Container';
import Component from '../Component';
import ProductDetails from './ProductDetails/ProductDetails';
import './ProductCard.css';
import InnerProductSlider from './InnerSlider/InnerSlider';

export default class ProductCard extends Component {
  productData: ProductResponse | null;

  constructor() {
    super();
    this.productData = null;
  }

  render = () => {
    const productCardContainer = new Container('product-card__container');
    this.content = productCardContainer.render();

    const realImageUrls = [
      '../testIMG/image1.jpg',
      './src/app/components/ProductCard/testIMG/image2.jpg',
      './src/app/components/ProductCard/testIMG/image3.jpg',
    ];

    const innerSliderContainer = new InnerProductSlider(realImageUrls).render();
    document.addEventListener('DOMContentLoaded', () => {
      new Splide('#thumbnail-carousel', {
        fixedWidth: 100,
        fixedHeight: 60,
        gap: 10,
        rewind: true,
        pagination: false,
        isNavigation: true,
        breakpoints: {
          600: {
            fixedWidth: 60,
            fixedHeight: 44,
          },
        },
      }).mount();
    });

    const productDetailsContainer = new ProductDetails().render();

    this.content.append(innerSliderContainer, productDetailsContainer);
    return this.content;
  };
}
