import './CatalogSidebar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DualHRangeBar } from 'dual-range-bar';
import Container from '../../../../UI/Container';
import sdkClient from '../../../../api/SdkClient';
import Component from '../../../../components/Component';
import updateQueryString from '../../../../utils/updateQueryString';
import { RangeEvent, RangeEventParams } from '../../../../../types/dataTypes';
import { itemColors, itemSizes } from '../../../../data/filterData';
import Input from '../../../../UI/Input';
import Label from '../../../../UI/Label';
import Button from '../../../../UI/Button';

export default class CatalogSidebar extends Component {
  render = () => {
    const sidebarContainer = new Container('sidebar-container');
    sidebarContainer.bindAsync(this.renderAsync);
    const categoriesContainer = new Container('sidebar__categories').render();
    const categoriesTitle = new Container('categories__title', 'Categories').render();
    const resetCategory = new Button('reset', '', 'categories__reset');
    resetCategory.addListener('click', (e: Event) => {
      const button = e.target as HTMLElement;
      button.classList.remove('categories__reset_active');
      this.resetCategories();
      this.clearQueryString('categories.id');
    });
    categoriesTitle.appendChild(resetCategory.render());
    categoriesContainer.appendChild(categoriesTitle);

    const priceContainer = new Container('sidebar__price').render();
    const priceTitle = new Container('price__title', 'Price').render();
    const resetPrice = new Button('reset', '', 'price__reset');
    resetPrice.addListener('click', (e: Event) => {
      const dualRange = document.querySelector('.price__range ') as HTMLElement;
      dualRange.setAttribute('data-lower', '0');
      dualRange.setAttribute('data-upper', '1');
      dualRange.dispatchEvent(
        new CustomEvent<RangeEventParams>('update', {
          detail: {
            lower: 0,
            upper: 1,
          },
        })
      );

      const rangeStart = dualRange.querySelector('.drbar-start') as HTMLElement;
      const rangeEnd = dualRange.querySelector('.drbar-end') as HTMLElement;
      const rangeElement = dualRange.querySelector('.drbar-range') as HTMLElement;
      const rangeBg = dualRange.querySelector('.drbar-bg') as HTMLElement;
      rangeStart.style.left = '-6px';
      rangeEnd.style.left = `${rangeBg.getBoundingClientRect().width - 5}px`;
      rangeElement.style.width = `${rangeBg.getBoundingClientRect().width}px`;
      rangeElement.style.left = '0px';

      const button = e.target as HTMLElement;
      button.classList.remove('price__reset_active');
      this.clearQueryString('price');
    });
    priceTitle.appendChild(resetPrice.render());
    priceContainer.appendChild(priceTitle);
    this.renderDualRange(priceContainer);

    const colorContainer = new Container('sidebar__color').render();
    const colorTitle = new Container('color__title', 'Color').render();
    const colorReset = new Button('reset', '', 'color__reset');
    colorReset.addListener('click', (e: Event) => {
      const button = e.target as HTMLElement;
      button.classList.remove('color__reset_active');
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.color__checkbox');
      checkboxes.forEach((checkbox) => {
        const element = checkbox;
        element.checked = false;
      });
      this.clearQueryString('color');
    });
    colorTitle.appendChild(colorReset.render());
    colorContainer.appendChild(colorTitle);
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

        const checkedCounter = [...colorCheckboxes].filter((checkbox) => checkbox.checked);

        const button = document.querySelector('.color__reset') as HTMLElement;
        button.classList.add('color__reset_active');

        if (checkedCounter.length === 0) {
          button.classList.remove('color__reset_active');
          this.clearQueryString('color');
        }
      });

      const renderedContainer = checkboxContainer.render();
      const checkbox = new Input(color, 1, 'color__checkbox', color, 'checkbox');
      const label = new Label(color, color, 'color__label').render();
      renderedContainer.append(checkbox.render(), label);
      colorContainer.append(renderedContainer);
    });

    const sizeContainer = new Container('sidebar__size').render();
    const sizeTitle = new Container('size__title', 'Size').render();
    const sizeReset = new Button('reset', '', 'size__reset');
    sizeReset.addListener('click', (e: Event) => {
      const button = e.target as HTMLElement;
      button.classList.remove('size__reset_active');
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.size__checkbox');
      checkboxes.forEach((checkbox) => {
        const element = checkbox;
        element.checked = false;
      });
      this.clearQueryString('size');
    });
    sizeTitle.appendChild(sizeReset.render());
    const sizeContent = new Container('size__content').render();
    sizeContainer.append(sizeTitle, sizeContent);
    itemSizes.forEach((size, index) => {
      const checkboxContainer = new Container('size__container');

      checkboxContainer.addListener('change', () => {
        const sizeCheckboxes = document.querySelectorAll<HTMLInputElement>('.size__checkbox');
        const selectedSizes: string[] = [];
        sizeCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedSizes.push(checkbox.name);
          }
        });

        updateQueryString({ size: selectedSizes.join() });
        const checkedCounter = [...sizeCheckboxes].filter((checkbox) => checkbox.checked);

        const button = document.querySelector('.size__reset') as HTMLElement;
        button.classList.add('size__reset_active');

        if (checkedCounter.length === 0) {
          button.classList.remove('size__reset_active');
          this.clearQueryString('size');
        }
      });

      const renderedContainer = checkboxContainer.render();
      const checkbox = new Input(String(index + 1), 1, 'size__checkbox', size, 'checkbox');
      const label = new Label(String(index + 1), size, 'size__label').render();
      renderedContainer.append(checkbox.render(), label);
      sizeContent.append(renderedContainer);
    });

    this.content = sidebarContainer.render();
    this.content.append(categoriesContainer, priceContainer, colorContainer, sizeContainer);
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

      const resetButton = document.querySelector('.price__reset') as HTMLElement;
      resetButton.classList.add('price__reset_active');

      if (rangeInfo.lower === 0 && rangeInfo.upper === 1) {
        this.clearQueryString('price');
        resetButton.classList.remove('price__reset_active');
      }
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
      const isCategoryElement =
        target.classList.contains('sidebar__subcategory') || target.classList.contains('sidebar__category');

      if (isCategoryElement) {
        this.resetCategories();
        target.classList.add('category__active');

        if (target.classList.contains('sidebar__subcategory')) {
          const parentElement = target.closest('.cat__container') as HTMLElement;
          parentElement.children[0].classList.add('category__active');
        }

        updateQueryString({ 'categories.id': `${target.dataset.categoryId}` });

        const resetButton = document.querySelector('.categories__reset') as HTMLElement;
        resetButton.classList.add('categories__reset_active');
      }
    });
  };

  resetCategories = () => {
    const categories = document.querySelectorAll<HTMLElement>('.sidebar__category');
    const subcategories = document.querySelectorAll<HTMLElement>('.sidebar__subcategory');
    categories.forEach((cat) => cat.classList.remove('category__active'));
    subcategories.forEach((cat) => cat.classList.remove('category__active'));
  };

  clearQueryString = (param: string) => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    searchParams.delete(param);
    let updatedUrl;

    if (searchParams.size > 0) {
      updatedUrl = `${window.location.href.replace(window.location.search, '')}?${searchParams.toString()}`;
    } else {
      updatedUrl = window.location.href.replace(window.location.search, '');
    }

    window.history.pushState(null, '', updatedUrl);

    const catalogContainer = document.querySelector('.catalog-container') as HTMLElement;
    const event = new Event('queryUpdated');
    catalogContainer.dispatchEvent(event);
  };

  renderAsync = async (component: HTMLElement) => {
    try {
      const categoriesData = await sdkClient.apiRoot.categories().get().execute();
      const mainCategories = categoriesData.body.results.filter((cat) => cat.ancestors.length === 0);

      mainCategories.forEach((cat) => {
        const categoryHeading = new Container('cat__container').render();
        const mainCat = new Container('sidebar__category', cat.name['en-US']).render();
        mainCat.setAttribute('data-category-id', cat.id);
        categoryHeading.appendChild(mainCat);
        const childCategories = categoriesData.body.results.filter((child) => child.parent?.id === cat.id);
        childCategories.forEach((child) => {
          const childHeading = new Container('sidebar__subcategory', child.name['en-US']).render();
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
