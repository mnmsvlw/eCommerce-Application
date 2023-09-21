import { Cart, ClientResponse, ProductProjection } from '@commercetools/platform-sdk';
import { ApiError } from '../../../types/sdkTypes';
import getCart from '../../api/cart/getCart';
import updateCartAddItem from '../../api/cart/updateCartAddItem';
import updateCartRemoveItem from '../../api/cart/updateCartRemoveItem';
import getProduct from '../../api/product/Product';
import Component from '../../components/Component';
import ProductCard from '../../components/ProductCard/ProductCard';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import redirect from '../../utils/redirect';
import SwiperSlider from '../../utils/Swiper';
import NotFoundModule from '../NotFoundModule/NotFoundModule';
import SuccessfulMessage from '../../components/RegistrationForm/SuccessfulMessage/SuccessfulMessage';
import sdkClient from '../../api/SdkClient';

export default class ProductModule extends Component {
  productData: ClientResponse<ProductProjection> | null;

  constructor() {
    super();
    this.productData = null;
  }

  render = () => {
    const productCardContainer = new Container('product-card__wrapper loader');
    productCardContainer.bindAsync(this.renderAsync);
    this.setProductShoppingCartListener(productCardContainer);
    this.content = productCardContainer.render();
    return this.content;
  };

  renderAsync = async (component: HTMLElement) => {
    const itemId = window.location.pathname.replace('/items', '').replaceAll('/', '');

    try {
      this.productData = await this.getProductData(itemId);
      const cartData = await getCart();
      let productInCart = false;

      if (cartData.results[0].lineItems.some((item) => item.productId === itemId)) {
        productInCart = true;
      }

      if (this.productData?.statusCode === 200) {
        const productCard = new ProductCard(this.productData, productInCart);
        const productCardContent = productCard.render();
        productCardContent.setAttribute('data-item-id', itemId);
        component.appendChild(productCardContent);
        new SwiperSlider().init('.swiper');
      }

      if (this.productData?.body === undefined) {
        const rootElement = document.querySelector('#root') as HTMLElement;
        const notFoundModule = new NotFoundModule().render();
        rootElement.appendChild(notFoundModule);
      }

      const productCardContainer = document.querySelector('.product-card__wrapper');
      productCardContainer?.classList.remove('loader');
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
      const inputSizeContainer = document.querySelector('.product-card__size-elements') as HTMLElement;

      try {
        const target = e.target as HTMLElement;
        const addToShoppingCart = target.closest('.add-to-basket__button') as HTMLElement;
        const cardContainer = document.querySelector('.product-card__container') as HTMLElement;
        const sizeInputs = document.querySelectorAll('.product-card__size-input') as NodeListOf<HTMLInputElement>;
        const selectedSizeInput = Array.from(sizeInputs).find((input) => input.checked) as HTMLInputElement;
        const numContainer = document.querySelector('.quantity-num') as HTMLElement;
        let selectedVariantId;
        let quantatyProduct;

        if (this.productData && selectedSizeInput) {
          const selectedSize = selectedSizeInput.value;
          const foundVariant = this.productData.body.variants.find((variant) => {
            if (variant.attributes) {
              return variant.attributes.some((attribute) => {
                const attributeName = attribute.name.toLowerCase();
                return (
                  (attributeName === 'size' || attributeName === 'size-w') && attribute.value.label === selectedSize
                );
              });
            }

            return false;
          });

          if (foundVariant) {
            selectedVariantId = foundVariant.id;
            const { setId } = numContainer.dataset;
            quantatyProduct = Number.isNaN(Number(setId)) ? 1 : Number(setId);
          }
        }

        const { itemId } = cardContainer.dataset;

        if (addToShoppingCart && itemId && selectedVariantId) {
          await updateCartAddItem(itemId, quantatyProduct, selectedVariantId);
          redirect(`/items/${itemId}`);
          const currentCart = sdkClient.activeCart as Cart;

          if (currentCart.lineItems.length > 0) {
            const cartCounter = document.querySelector('.cart-counter') as HTMLElement;
            const customEvent = new Event('cartChanged');
            cartCounter.dispatchEvent(customEvent);
          }
        } else if (addToShoppingCart && itemId) {
          const notice = document.querySelector('.info-size');

          if (!notice) {
            this.showInfo(inputSizeContainer, 'Please select size');
          }
        }

        const removeFromCart = target.closest('.add-to-basket__button-remove') as HTMLElement;
        const cartData = await getCart();
        const lineItemId = cartData.results[0].lineItems.find((item) => item.productId === itemId)?.id;

        if (removeFromCart && lineItemId) {
          await updateCartRemoveItem(lineItemId);
          redirect(`/items/${itemId}`);
          const currentCart = sdkClient.activeCart as Cart;
          const sussesfulPopup = new SuccessfulMessage().render('The product has been removed successfully');
          const body = document.querySelector('body');
          const pageContainer = document.querySelector('.page-container') as HTMLElement;

          if (pageContainer !== null && body !== null) {
            pageContainer.append(sussesfulPopup);
            this.closeModal(sussesfulPopup, body);
          }

          if (currentCart.lineItems.length > 0) {
            const cartCounter = document.querySelector('.cart-counter') as HTMLElement;
            const customEvent = new Event('cartChanged');
            cartCounter.dispatchEvent(customEvent);
          }
        }
      } catch (error) {
        const apiError = error as ApiError;
        console.log(`${apiError.message}`);
      }
    });
  };

  showInfo(doc: HTMLElement, text: string) {
    const info = new Heading(6, 'info-size', `${text}`).render();
    doc.append(info);
    const TIME = 3000;

    setTimeout(() => {
      info.remove();
    }, TIME);
  }

  private closeModal = (targetEL: HTMLElement, body: HTMLBodyElement) => {
    const localBody = body;
    setTimeout(() => {
      targetEL.classList.add('hidden');
      localBody.style.overflow = 'initial';
    }, 1000);
  };
}
