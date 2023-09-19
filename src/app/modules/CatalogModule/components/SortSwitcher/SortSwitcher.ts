import './SortSwitcher.css';
import Select from '../../../../UI/Select';
import Component from '../../../../components/Component';
import updateQueryString from '../../../../utils/updateQueryString';

export default class SortSwitcher extends Component {
  render = () => {
    const selectInput = new Select(
      'sort',
      [
        { text: 'Price: Low to High', value: 'price asc' },
        { text: 'Price: High to Low', value: 'price desc' },
        { text: 'Name: A to Z', value: 'name.en-US asc' },
        { text: 'Name: Z to A', value: 'name.en-US desc' },
      ],
      'Sort',
      'sort-input'
    );

    selectInput.addListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      updateQueryString({ sort: target.value });
    });
    this.content = selectInput.render();
    return this.content;
  };
}
