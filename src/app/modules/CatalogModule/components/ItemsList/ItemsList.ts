import Container from '../../../../UI/Container';
import sdkClient from '../../../../api/SdkClient';
import Component from '../../../../components/Component';
import ItemCard from '../../../../components/ItemCard/ItemCard';
import redirect from '../../../../utils/redirect';
import updateCartAddItem from '../../../../api/cart/updateCartAddItem';
import './ItemsList.css';

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
      const target = e.target as HTMLElement;
      const closestShoppingCart = target.closest('.item-card__basket') as HTMLElement;

      if (closestShoppingCart) {
        const { itemId } = closestShoppingCart.dataset;

        if (itemId) {
          updateCartAddItem(itemId);
        }
      }
    });
  };

  setCatalogContainerListener = (container: Container) => {
    container.addListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const closestCard = target.closest('.item-card') as HTMLElement;

      if (closestCard && !target.closest('.item-card__basket')) {
        const { itemId } = closestCard.dataset;
        redirect(`/items/${itemId}`);
      }
    });
  };

  renderAsync = async (component: HTMLElement) => {
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
      itemsList = (
        await sdkClient.apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs,
          })
          .execute()
      ).body.results;
    } else {
      itemsList = (await sdkClient.apiRoot.productProjections().search().get().execute()).body.results;
    }

    const element = component;
    element.innerHTML = '';

    if (itemsList.length > 0) {
      itemsList.forEach((item) => {
        component.appendChild(new ItemCard().render(item));
      });
    } else {
      element.appendChild(new Container('no-items', 'No items found').render());
    }

    // this.setCatalogContainerListener(component);
  };
}
