import { ProductResponse } from '../../../types/productTypes';
import Container from '../../UI/Container';
import Component from '../Component';
import ProductDetails from './ProductDetails/ProductDetails';
import './ProductCard.css';

export default class ProductCard extends Component {
  productData: ProductResponse | null;

  constructor() {
    super();
    this.productData = null;
  }

  render = () => {
    const productCardContainer = new Container('product-card__container');
    this.content = productCardContainer.render();

    const innerSliderContainer = new Container('product-card__slider-container').render();
    const productDetailsContainer = new ProductDetails().render();

    this.content.append(innerSliderContainer, productDetailsContainer);
    return this.content;
  };
}
