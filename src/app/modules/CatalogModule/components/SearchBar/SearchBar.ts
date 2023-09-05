import './SearchBar.css';
import Input from '../../../../UI/Input';
import Component from '../../../../components/Component';
import updateQueryString from '../../../../utils/updateQueryString';

export default class SearchBar extends Component {
  render = () => {
    const input = new Input('catalog-search', 100, 'catalog-search', 'Type in a keyword and press "Enter"...');

    input.addListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      updateQueryString({ text: target.value });
    });
    this.content = input.render();
    return this.content;
  };
}
