import { ProductProjection, Image, ClientResponse } from '@commercetools/platform-sdk';
import Container from '../../UI/Container';
import Component from '../Component';
import ProductDetails from './ProductDetails/ProductDetails';
import InnerProductSlider from './InnerSlider/InnerSlider';
import './ProductCard.css';
import 'swiper/css/bundle';

export default class ProductCard extends Component {
  productData: ProductProjection;

  productInCart: boolean;

  constructor(data: ClientResponse<ProductProjection>, productInCart: boolean) {
    super();
    this.productData = data.body;
    this.productInCart = productInCart;
  }

  render = () => {
    this.content = new Container('product-card__container').render();

    const imageArr = this.productData.masterVariant.images as Image[];
    const innerSliderContainer = new InnerProductSlider(imageArr).render();

    const productDetailsContainer = new ProductDetails(this.productData, this.productInCart).render();

    this.content.append(innerSliderContainer, productDetailsContainer);
    return this.content;
  };
}
