// import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import sdkClient from '../../api/SdkClient';
import Container from '../../UI/Container';
import Component from '../../components/Component';
import Heading from '../../UI/Heading';

export default class CatalogModule extends Component {
  render = () => {
    const catalogContainer = new Container('catalog-container');
    catalogContainer.bindAsync(this.renderAsync);

    this.content = catalogContainer.render();
    return this.content;
  };

  renderAsync = async (component: HTMLElement) => {
    // Async logic example
    const itemsList = await sdkClient.apiRoot.productProjections().get().execute();
    console.log(itemsList);
    component.appendChild(new Heading(1, 'heading', JSON.stringify(itemsList)).render());
  };
}
