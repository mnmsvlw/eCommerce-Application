import { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';
import getProduct from '../../api/product/Product';
import Component from '../../components/Component';
import ProductCard from '../../components/ProductCard/ProductCard';

export default class ProductModule extends Component {
  productData: ClientResponse<ProductProjection> | null;

  constructor() {
    super();
    this.productData = null;
  }

  async renderEl(key: string) {
    await this.getProductData(key);

    if (this.productData) {
      const productCard = new ProductCard(this.productData as ClientResponse<ProductProjection>);
      this.content = productCard.render();
    }

    return this.content;
  }

  private getProductData = async (key: string) => {
    try {
      this.productData = await getProduct(key);
    } catch (error) {
      console.log(error);
    }
  };
}
