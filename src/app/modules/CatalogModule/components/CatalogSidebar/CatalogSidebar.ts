import './CatalogSidebar.css';
import Container from '../../../../UI/Container';
import Heading from '../../../../UI/Heading';
import LiElement from '../../../../UI/Li';
import UlElement from '../../../../UI/Ul';
import sdkClient from '../../../../api/SdkClient';
import Component from '../../../../components/Component';
import updateQueryString from '../../../../utils/updateQueryString';

export default class CatalogSidebar extends Component {
  render = () => {
    const sidebarContainer = new Container('sidebar-container');
    sidebarContainer.bindAsync(this.renderAsync);
    const categoriesHeading = new Container('sidebar__categories', 'Categories').render();
    const priceHeading = new Container('sidebar__categories', 'Price').render();
    const colorHeading = new Heading(2, 'sidebar__categories', 'Color').render();
    const sizeHeading = new Heading(2, 'sidebar__categories', 'Size').render();

    this.content = sidebarContainer.render();
    this.content.append(categoriesHeading, priceHeading, colorHeading, sizeHeading);
    return this.content;
  };

  setCategoryListener = (container: HTMLElement) => {
    container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const closestCard = (target.closest('.sidebar__subcategory') ||
        target.closest('.sidebar__category')) as HTMLElement;

      if (closestCard) {
        updateQueryString({ 'categories.id': `${closestCard.dataset.categoryId}` });
      }
    });
  };

  renderAsync = async (component: HTMLElement) => {
    try {
      const categoriesData = await sdkClient.apiRoot.categories().get().execute();
      const mainCategories = categoriesData.body.results.filter((cat) => cat.ancestors.length === 0);

      mainCategories.forEach((cat) => {
        const categoryHeading = new UlElement('sidebar__category', cat.name['en-US']).render();
        categoryHeading.setAttribute('data-category-id', cat.id);
        const childCategories = categoriesData.body.results.filter((child) => child.parent?.id === cat.id);
        childCategories.forEach((child) => {
          const childHeading = new LiElement('sidebar__subcategory', child.name['en-US']).render();
          childHeading.setAttribute('data-category-id', child.id);
          categoryHeading.append(childHeading);
        });
        component.firstChild?.appendChild(categoryHeading);
      });
      this.setCategoryListener(component);
    } catch (e) {
      console.log(e);
    }
  };
}
