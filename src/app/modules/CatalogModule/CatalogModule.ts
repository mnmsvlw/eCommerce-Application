import sdkClient from '../../api/SdkClient';
import Container from '../../UI/Container';
import Component from '../../components/Component';
import ItemCard from '../../components/ItemCard/ItemCard';

export default class CatalogModule extends Component {
  render = () => {
    const catalogContainer = new Container('catalog-container');
    catalogContainer.bindAsync(this.renderAsync);

    this.content = catalogContainer.render();
    return this.content;
  };

  renderAsync = async (component: HTMLElement) => {
    // Async logic example
    const itemsList = (await sdkClient.apiRoot.productProjections().get().execute()).body.results;
    itemsList.forEach((item) => {
      component.appendChild(new ItemCard().render(item));
    });
    // console.log(itemsList);
    // component.appendChild(new Heading(1, 'heading', JSON.stringify(itemsList)).render());
  };
}
