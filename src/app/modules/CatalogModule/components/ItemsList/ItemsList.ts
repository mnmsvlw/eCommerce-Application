import './ItemsList.css';
import Container from '../../../../UI/Container';
import sdkClient from '../../../../api/SdkClient';
import Component from '../../../../components/Component';
import ItemCard from '../../../../components/ItemCard/ItemCard';
import redirect from '../../../../utils/redirect';

export default class ItemsList extends Component {
  render = () => {
    const itemsListContainer = new Container('items-list-container');
    itemsListContainer.bindAsync(this.renderAsync);
    this.content = itemsListContainer.render();
    return this.content;
  };

  setCatalogContainerListener = (container: HTMLElement) => {
    container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const closestCard = target.closest('.item-card') as HTMLElement;

      if (closestCard) {
        const { itemId } = closestCard.dataset;
        redirect(`/items/${itemId}`);
      }
    });
  };

  renderAsync = async (component: HTMLElement) => {
    // const itemsList = (await sdkClient.apiRoot.productProjections().get().execute()).body.results;
    const queryParams = new URLSearchParams(window.location.search);
    let filterParams = '';
    let itemsList;
    console.log(queryParams);

    if (queryParams.size > 0) {
      [...queryParams.entries()].forEach(([key, value]) => {
        filterParams += `${key}:"${value}"`;
      });
      itemsList = (
        await sdkClient.apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: {
              filter: filterParams,
            },
          })
          .execute()
      ).body.results;
    } else {
      itemsList = (await sdkClient.apiRoot.productProjections().search().get().execute()).body.results;
    }

    itemsList.forEach((item) => {
      component.appendChild(new ItemCard().render(item));
    });
    this.setCatalogContainerListener(component);
  };
}
