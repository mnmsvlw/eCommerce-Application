import Container from '../../UI/Container';
import sdkClient from '../../api/SdkClient';
import Component from '../../components/Component';
import ItemCard from '../../components/ItemCard/ItemCard';
import redirect from '../../utils/redirect';

export default class CatalogModule extends Component {
  render = () => {
    const catalogContainer = new Container('catalog-container');
    catalogContainer.bindAsync(this.renderAsync);

    this.content = catalogContainer.render();
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
    const itemsList = (await sdkClient.apiRoot.productProjections().get().execute()).body.results;
    itemsList.forEach((item) => {
      component.appendChild(new ItemCard().render(item));
    });
    this.setCatalogContainerListener(component);
  };
}
