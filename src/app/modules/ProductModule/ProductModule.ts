import getCart from '../../api/cart/getCart';
import updateCartAddItem from '../../api/cart/updateCartAddItem';
import updateCartRemoveItem from '../../api/cart/updateCartRemoveItem';
import getProduct from '../../api/product/Product';
import Component from '../../components/Component';
import ProductCard from '../../components/ProductCard/ProductCard';
import Container from '../../UI/Container';
import redirect from '../../utils/redirect';
import SwiperSlider from '../../utils/Swiper';
import NotFoundModule from '../NotFoundModule/NotFoundModule';

export default class ProductModule extends Component {
  render = () => {
    const productCardContainer = new Container('product-card__wrapper');
    productCardContainer.bindAsync(this.renderAsync);
    this.setProductShoppingCartListener(productCardContainer);
    this.content = productCardContainer.render();
    return this.content;
  };

  renderAsync = async (component: HTMLElement) => {
    const itemId = window.location.pathname.replace('/items', '').replaceAll('/', '');

    try {
      const productData = await this.getProductData(itemId);
      const cartData = await getCart();
      let productInCart = false;

      if (cartData.results[0].lineItems.some((item) => item.productId === itemId)) {
        productInCart = true;
      }

      if (productData?.statusCode === 200) {
        const productCard = new ProductCard(productData, productInCart);
        const productCardContent = productCard.render();
        productCardContent.setAttribute('data-item-id', itemId);
        component.appendChild(productCardContent);
        new SwiperSlider().init('.swiper');
      }

      if (productData?.body === undefined) {
        const rootElement = document.querySelector('#root') as HTMLElement;
        const notFoundModule = new NotFoundModule().render();
        rootElement.appendChild(notFoundModule);
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

  private setProductShoppingCartListener = (container: Container) => {
    container.addListener('click', async (e: Event) => {
      const target = e.target as HTMLElement;
      const cardContainer = document.querySelector('.product-card__container') as HTMLElement;
      const addToShoppingCart = target.closest('.add-to-basket__button') as HTMLElement;
      const { itemId } = cardContainer.dataset;

      if (addToShoppingCart && itemId) {
        updateCartAddItem(itemId);
        redirect(`/items/${itemId}`);
      }

      const removeFromCart = target.closest('.add-to-basket__button-remove') as HTMLElement;
      const cartData = await getCart();
      const lineItemId = cartData.results[0].lineItems.find((item) => item.productId === itemId)?.id;

      if (removeFromCart && lineItemId) {
        updateCartRemoveItem(lineItemId);
        redirect(`/items/${itemId}`);
      }
    });
  };
}
