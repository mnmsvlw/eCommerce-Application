import { ProductResponse } from '../../../types/productTypes';
import Container from '../../UI/Container';
import Component from '../Component';
import ProductDetails from './ProductDetails/ProductDetails';

export default class ProductCard extends Component {
  productData: ProductResponse;

  constructor(data: ProductResponse) {
    super();
    this.productData = data;
  }

  render = () => {
    const productCardContainer = new Container('product-card__container');
    this.content = productCardContainer.render();

    const innerSliderContainer = new Container('product-card__slider-container').render();
    const productDetailsContainer = new ProductDetails(this.productData).render();

    this.content.append(innerSliderContainer, productDetailsContainer);
    return this.content;
  };
}
