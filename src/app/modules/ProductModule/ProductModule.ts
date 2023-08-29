import { ProductResponse } from '../../../types/productTypes';
import Component from '../../components/Component';
import ProductCard from '../../components/ProductCard/ProductCard';

export default class ProductModule extends Component {
  productData: ProductResponse | null;

  constructor() {
    super();
    this.productData = null;
  }

  render = () => {
    const productCard = new ProductCard();
    this.content = productCard.render();

    return this.content;
  };
}
