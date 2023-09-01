import getProduct from '../../api/product/Product';
import Component from '../../components/Component';
import ProductCard from '../../components/ProductCard/ProductCard';
import Container from '../../UI/Container';
import SwiperSlider from '../../utils/Swiper';

export default class ProductModule extends Component {
  render = (key: string) => {
    const productCardContainer = new Container('product-card__wrapper');
    productCardContainer.bindAsync(this.renderAsync, key);

    this.content = productCardContainer.render();
    return this.content;
  };

  renderAsync = async (component: HTMLElement, key?: string) => {
    if (key) {
      const productData = await this.getProductData(key);

      if (productData) {
        const productCard = new ProductCard(productData);
        const productCardContent = productCard.render();
        component.appendChild(productCardContent);
        new SwiperSlider().init();
      }
    }
  };

  private getProductData = async (key: string) => {
    try {
      const productData = await getProduct(key);
      return productData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
