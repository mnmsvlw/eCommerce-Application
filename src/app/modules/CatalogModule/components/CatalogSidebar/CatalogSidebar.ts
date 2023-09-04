import './CatalogSidebar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DualHRangeBar } from 'dual-range-bar';
import Container from '../../../../UI/Container';
import Heading from '../../../../UI/Heading';
import LiElement from '../../../../UI/Li';
import UlElement from '../../../../UI/Ul';
import sdkClient from '../../../../api/SdkClient';
import Component from '../../../../components/Component';
import updateQueryString from '../../../../utils/updateQueryString';
import { RangeEvent } from '../../../../../types/dataTypes';
import itemColors from '../../../../data/filterData';
import Input from '../../../../UI/Input';
import Label from '../../../../UI/Label';

export default class CatalogSidebar extends Component {
  render = () => {
    const sidebarContainer = new Container('sidebar-container');
    sidebarContainer.bindAsync(this.renderAsync);
    const categoriesHeading = new Container('sidebar__categories', 'Categories').render();

    const priceHeading = new Container('sidebar__price', 'Price').render();
    this.renderDualRange(priceHeading);

    const colorHeading = new Container('sidebar__color', 'Color').render();
    itemColors.forEach((color) => {
      const checkboxContainer = new Container('color__container');

      checkboxContainer.addListener('change', () => {
        const colorCheckboxes = document.querySelectorAll<HTMLInputElement>('.color__checkbox');
        const selectedColors: string[] = [];
        colorCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedColors.push(checkbox.name);
          }
        });
        updateQueryString({ color: selectedColors.join() });
      });

      const renderedContainer = checkboxContainer.render();
      const checkbox = new Input(color, 1, 'color__checkbox', color, 'checkbox');
      const label = new Label(color, color, 'color__label').render();
      renderedContainer.append(checkbox.render(), label);
      colorHeading.append(renderedContainer);
    });

    const sizeHeading = new Heading(2, 'sidebar__size', 'Size').render();

    this.content = sidebarContainer.render();
    this.content.append(categoriesHeading, priceHeading, colorHeading, sizeHeading);
    return this.content;
  };

  renderDualRange(container: HTMLElement) {
    const rangeText = new Container('price__range-text', 'From 180 USD to 1990 USD').render();
    const rangeInput = new Container('price__range');
    rangeInput.addListener('update', (e: RangeEvent) => {
      const rangeTextElement = document.querySelector('.price__range-text') as HTMLElement;
      const rangeInfo = e.detail as { lower: number; upper: number };

      rangeTextElement.textContent = `From ${Math.floor(rangeInfo.lower * 1810 + 180)} USD to ${Math.ceil(
        rangeInfo.upper * 1810 + 180
      )} USD`;
      const value = `variants.price.centAmount: range (${Math.floor(rangeInfo.lower * 1810 + 180) * 100} to ${
        Math.ceil(rangeInfo.upper * 1810 + 180) * 100
      })`;

      updateQueryString({ price: value });
    });
    const rangeEl = rangeInput.render() as HTMLDivElement;
    const drbar = new DualHRangeBar(rangeEl, {
      minimizes: true,
      size: 'small',
    });
    console.log(drbar);

    container.append(rangeEl, rangeText);
  }

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
