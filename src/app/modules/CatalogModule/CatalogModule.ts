import './CatalogModule.css';
import Container from '../../UI/Container';
import Component from '../../components/Component';
import CatalogSidebar from './components/CatalogSidebar/CatalogSidebar';
import ItemsList from './components/ItemsList/ItemsList';
import SortSwitcher from './components/SortSwitcher/SortSwitcher';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../UI/Button';

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

  resetQuery = () => {
    const updatedUrl = window.location.href.replace(window.location.search, '');
    window.history.pushState(null, '', updatedUrl);
  };

  filterMobileHandler = () => {
    const sidebar = document.querySelector('.sidebar-container') as HTMLElement;
    sidebar.classList.add('sidebar-container_active');
  };

  hideFilter = (sidebar: HTMLElement) => {
    const icon = new Container('sidebar__hide');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    icon.addListener('click', () => {
      const sidebarElement = document.querySelector('.sidebar-container') as HTMLElement;
      sidebarElement.classList.remove('sidebar-container_active');
    });

    const renderedIcon = icon.render();
    renderedIcon.append(span, span2);
    sidebar.appendChild(renderedIcon);
  };

  render = () => {
    const catalogContainer = new Container('catalog-container');
    const sidebar = new CatalogSidebar().render();
    const mainContainer = new Container('right-container').render();
    const searchBar = new SearchBar().render();
    const sortFilterContainer = new Container('sort-filter-container').render();
    const filterButton = new Button('Filter', '', 'filter__button');
    filterButton.addListener('click', this.filterMobileHandler);
    const sortSwitcher = new SortSwitcher().render();
    sortFilterContainer.append(filterButton.render(), sortSwitcher);
    const itemsList = new ItemsList().render();

    this.hideFilter(sidebar);
    this.addUpdateQueryStringListener(catalogContainer);
    this.resetQuery();

    mainContainer.append(searchBar, sortFilterContainer, itemsList);
    this.content = catalogContainer.render();
    this.content.append(sidebar, mainContainer);
    return this.content;
  };
}
