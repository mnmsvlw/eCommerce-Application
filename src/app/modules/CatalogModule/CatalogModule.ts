import './CatalogModule.css';
import Container from '../../UI/Container';
import Component from '../../components/Component';
import CatalogSidebar from './components/CatalogSidebar/CatalogSidebar';
import ItemsList from './components/ItemsList/ItemsList';

export default class CatalogModule extends Component {
  addUpdateQueryStringListener = () => {
    window.addEventListener('queryUpdated', () => {
      const itemsListContainer = document.querySelector('.items-list-container') as HTMLElement;
      itemsListContainer.innerHTML = '';
      const newContainer = new ItemsList();
      newContainer.renderAsync(itemsListContainer);
    });
  };

  render = () => {
    this.content = new Container('catalog-container').render();
    const sidebar = new CatalogSidebar().render();
    const itemsList = new ItemsList().render();

    this.addUpdateQueryStringListener();
    this.content.append(sidebar, itemsList);
    return this.content;
  };
}
