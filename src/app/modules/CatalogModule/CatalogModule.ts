import './CatalogModule.css';
import Container from '../../UI/Container';
import Component from '../../components/Component';
import CatalogSidebar from './components/CatalogSidebar/CatalogSidebar';
import ItemsList from './components/ItemsList/ItemsList';
import SortSwitcher from './components/SortSwitcher/SortSwitcher';
import SearchBar from './components/SearchBar/SearchBar';

export default class CatalogModule extends Component {
  addUpdateQueryStringListener = (catalogContainer: Container) => {
    catalogContainer.addListener('queryUpdated', (e: Event) => {
      const containerElement = e.target as HTMLElement;
      const itemsListContainer = containerElement.querySelector('.items-list-container') as HTMLElement;
      itemsListContainer.innerHTML = '';
      const newContainer = new ItemsList();
      newContainer.renderAsync(itemsListContainer);
    });
  };

  render = () => {
    const catalogContainer = new Container('catalog-container');
    const sidebar = new CatalogSidebar().render();
    const mainContainer = new Container('right-container').render();
    const searchBar = new SearchBar().render();
    const sortSwitcher = new SortSwitcher().render();
    const itemsList = new ItemsList().render();

    this.addUpdateQueryStringListener(catalogContainer);

    mainContainer.append(searchBar, sortSwitcher, itemsList);
    this.content = catalogContainer.render();
    this.content.append(sidebar, mainContainer);
    return this.content;
  };
}
