import sdkClient from '../../api/SdkClient';
import ItemCard from '../../components/ItemCard/ItemCard';
import CatalogModule from '../../modules/CatalogModule/CatalogModule';
import Header from '../../modules/Header/Header';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class CatalogPage extends Page {
  init = async () => {
    const itemsList = await sdkClient.apiRoot.productProjections().get().execute();
    return itemsList;
  };

  create() {
    this.page.appendChild(new Header().render());
    this.page.innerHTML += 'Catalog Page';
    this.page.appendChild(
      new ItemCard().render(
        'adidas',
        '200',
        'https://fastly.picsum.photos/id/872/200/300.jpg?hmac=ZO8BvamVelLddwqo7mHSnq6o6uXwPb9r41i4KuJTVdo',
        'db30bf01-7b1b-4109-995a-2068e0e1774c'
      )
    );
    this.page.appendChild(new CatalogModule().render());

    if (window.location.pathname.replace(/^\/items\/?/, '')) {
      this.page.innerHTML += ` for ID ${window.location.pathname.replace(/^\/items\/?/, '')}`;
    }

    listenBurger(this.page);
  }
}
