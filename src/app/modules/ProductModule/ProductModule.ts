import getProduct from '../../api/product/Product';
import Component from '../../components/Component';
import ProductCard from '../../components/ProductCard/ProductCard';
import Container from '../../UI/Container';
import SwiperSlider from '../../utils/Swiper';
import NotFoundModule from '../NotFoundModule/NotFoundModule';

export default class ProductModule extends Component {
  render = () => {
    const productCardContainer = new Container('product-card__wrapper');
    productCardContainer.bindAsync(this.renderAsync);

    this.content = productCardContainer.render();
    return this.content;
  };

  renderAsync = async (component: HTMLElement) => {
    const itemId = window.location.pathname.replace('/items', '').replaceAll('/', '');

    try {
      const productData = await this.getProductData(itemId);

      if (productData?.statusCode === 200) {
        const productCard = new ProductCard(productData);
        const productCardContent = productCard.render();
        component.appendChild(productCardContent);
        new SwiperSlider().init('.swiper');
      }

      if (productData?.body === undefined) {
        const rootElement = document.querySelector('#root') as HTMLElement;
        const notFoundComponent = new NotFoundModule().render();
        rootElement.appendChild(notFoundComponent);
      }
    } catch (e) {
      console.log(e);
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
