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
        const closestShoppingCart = target.closest('.item-card__basket') as HTMLElement;

        if (closestShoppingCart) {
          const { itemId } = closestShoppingCart.dataset;

          if (itemId) {
            updateCartAddItem(itemId);
            redirect(`/items/`);
          }
        }

        const removeFromCart = target.closest('.item-card__basket-remove') as HTMLElement;

        if (removeFromCart) {
          const { itemId } = removeFromCart.dataset;
          const cartData = await getCart();
          const lineItemId = cartData.results[0].lineItems.find((item) => item.productId === itemId)?.id;
          console.log(itemId);

          if (lineItemId) {
            updateCartRemoveItem(lineItemId);
            redirect(`/items/`);
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

      if (closestCard && !target.closest('.item-card__basket') && !target.closest('.item-card__basket-remove')) {
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
}
