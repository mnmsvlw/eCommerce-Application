import {
  CartPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import Container from '../../../../UI/Container';
import sdkClient from '../../../../api/SdkClient';
import Component from '../../../../components/Component';
import ItemCard from '../../../../components/ItemCard/ItemCard';
import redirect from '../../../../utils/redirect';
import updateCartAddItem from '../../../../api/cart/updateCartAddItem';
import './ItemsList.css';
import getCart from '../../../../api/cart/getCart';
import updateCartRemoveItem from '../../../../api/cart/updateCartRemoveItem';
import getProduct from '../../../../api/product/Product';
import SizeSelection from './SizeSelection/SizeSelection';
import Heading from '../../../../UI/Heading';

export default class ItemsList extends Component {
  render = () => {
    const itemsListContainer = new Container('items-list-container');
    itemsListContainer.bindAsync(this.renderAsync);
    this.setCatalogContainerListener(itemsListContainer);
    this.setCatalogShoppingCartListener(itemsListContainer);
    this.content = itemsListContainer.render();
    return this.content;
  };

  setCatalogShoppingCartListener = (container: Container) => {
    container.addListener('click', async (e: Event) => {
      try {
        const target = e.target as HTMLElement;
        const closestItemCard = target.closest('.item-card') as HTMLElement;
        const closestAddToCartBtn = target.closest('.item-card__add-btn') as HTMLElement;
        const sizes = target.closest('.item-card__size-el-container') as HTMLElement;
        const removeFromCartBtn = target.closest('.item-card__basket-remove') as HTMLElement;
        const { itemId } = closestItemCard.dataset;
        let selectedVariantId;
        let productData;

        if (itemId) {
          productData = await getProduct(itemId);
          closestItemCard.append(new SizeSelection(productData.body).render());
        }

        const sizeSelectionContainer = closestItemCard.querySelector('.item-card__size-selection') as HTMLElement;

        if (!sizes && !closestAddToCartBtn && !removeFromCartBtn) {
          console.log('btn inner clicked');
          sizeSelectionContainer.classList.toggle('item-card__size-selection--flipped');
        }

        const sizeInputs = document.querySelectorAll('.item-card__size-input') as NodeListOf<HTMLInputElement>;
        const selectedSizeInput = Array.from(sizeInputs).find((input) => input.checked) as HTMLInputElement;

        if (selectedSizeInput) {
          const selectedSize = selectedSizeInput.value;
          const foundVariant = productData?.body.variants.find((variant) => {
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

          selectedVariantId = foundVariant?.id;
        }

        if (itemId && selectedVariantId && closestAddToCartBtn) {
          updateCartAddItem(itemId, 1, selectedVariantId);
          // redirect(`/items/`);
          const catalogContainer = document.querySelector('.catalog-container') as HTMLElement;
          const event = new Event('queryUpdated');
          catalogContainer.dispatchEvent(event);
        } else if (itemId && closestAddToCartBtn) {
          const notice = document.querySelector('.info-size');

          if (!notice) {
            this.showInfo(sizeSelectionContainer, 'Please select size');
          }
        }

        const removeFromCart = target.closest('.item-card__basket-remove') as HTMLElement;

        if (removeFromCart) {
          const cartData = await getCart();
          const lineItemId = cartData.results[0].lineItems.find((item) => item.productId === itemId)?.id;

          if (lineItemId) {
            updateCartRemoveItem(lineItemId);
            // redirect(`/items/`);
            const catalogContainer = document.querySelector('.catalog-container') as HTMLElement;
            const event = new Event('queryUpdated');
            catalogContainer.dispatchEvent(event);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  setCatalogContainerListener = (container: Container) => {
    container.addListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const closestCard = target.closest('.item-card') as HTMLElement;

      if (
        closestCard &&
        !target.closest('.item-card__basket') &&
        !target.closest('.item-card__basket-remove') &&
        !target.closest('.item-card__size-selection--flipped')
      ) {
        const { itemId } = closestCard.dataset;
        redirect(`/items/${itemId}`);
      }
    });
  };

  renderItemCard = (
    itemsList: ClientResponse<ProductProjectionPagedSearchResponse>,
    cartData: CartPagedQueryResponse,
    component: HTMLElement
  ) => {
    itemsList.body.results.forEach((item) => {
      let productInCart = false;

      if (cartData.results[0].lineItems.some((itemCart) => item.id === itemCart.productId)) {
        productInCart = true;
      }

      component.appendChild(new ItemCard(productInCart).render(item));
    });
  };

  removeShowMoreElement = () => {
    const showMoreElement = document.querySelector('.show-more') as HTMLElement;

    if (showMoreElement) {
      showMoreElement.remove();
    }
  };

  renderAsync = async (component: HTMLElement) => {
    this.removeShowMoreElement();
    const loader = new Container('loader').render();
    component.appendChild(loader);

    const queryParams = new URLSearchParams(window.location.search);
    const filterParams: string[] = [];
    let sortParams = '';
    let textParams = '';
    let itemsList;

    if (queryParams.size > 0) {
      [...queryParams.entries()].forEach(([key, value]) => {
        if (key === 'sort') {
          sortParams += value;
        } else if (key === 'text') {
          textParams = value;
        } else if (key === 'price') {
          filterParams.push(value);
        } else if (key === 'color') {
          filterParams.push(`variants.attributes.color:"${value.split(',').join('", "')}"`);
        } else if (key === 'size') {
          filterParams.push(`variants.attributes.size.key:"${value.split(',').join('", "')}"`);
        } else {
          filterParams.push(`${key}:"${value}"`);
        }
      });
    }

    const queryArgs: { filter?: string[]; sort?: string; 'text.en-US'?: string } = {};

    if (filterParams.length > 0) {
      queryArgs.filter = filterParams;
    }

    if (sortParams) {
      queryArgs.sort = sortParams;
    }

    if (textParams) {
      queryArgs['text.en-US'] = textParams;
    }

    if (queryArgs) {
      itemsList = await sdkClient.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            ...queryArgs,
            limit: 18,
          },
        })
        .execute();
    } else {
      itemsList = await sdkClient.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 18,
          },
        })
        .execute();
    }

    const cartData = await getCart();
    const element = component;
    element.innerHTML = '';

    if (itemsList.body.results.length > 0) {
      this.renderItemCard(itemsList, cartData, component);
    } else {
      element.appendChild(new Container('no-items', 'No items found').render());
    }

    const totalCount = itemsList.body.total as number;

    if (totalCount > itemsList.body.limit) {
      const showMore = new Container('show-more', 'Show more').render();
      let currentOffset = itemsList.body.offset;

      showMore.addEventListener('click', async () => {
        showMore.textContent = '';
        showMore.classList.add('loader');
        currentOffset += 18;

        let nextItems;

        if (queryArgs) {
          nextItems = await sdkClient.apiRoot
            .productProjections()
            .search()
            .get({
              queryArgs: {
                ...queryArgs,
                limit: 18,
                offset: currentOffset,
              },
            })
            .execute();
        } else {
          nextItems = await sdkClient.apiRoot
            .productProjections()
            .search()
            .get({
              queryArgs: {
                limit: 18,
                offset: currentOffset,
              },
            })
            .execute();
        }

        this.renderItemCard(nextItems, cartData, component);

        if (currentOffset + 18 >= totalCount) {
          showMore.remove();
        }

        showMore.textContent = 'Show more';
        showMore.classList.remove('loader');
      });

      element.after(showMore);
    }
  };

  showInfo(doc: HTMLElement, text: string) {
    const info = new Heading(6, 'info-size', `${text}`).render();
    doc.append(info);
    const TIME = 3000;

    setTimeout(() => {
      info.remove();
    }, TIME);
  }
}
