import { ProductProjection } from '@commercetools/platform-sdk';
import { SizeValue } from '../../../../../../types/productTypes';
import Component from '../../../../../components/Component';
import Button from '../../../../../UI/Button';
import Container from '../../../../../UI/Container';
import Heading from '../../../../../UI/Heading';
import Input from '../../../../../UI/Input';
import Label from '../../../../../UI/Label';
import './SizeSelection.css';

export default class SizeSelection extends Component {
  product: ProductProjection;

  constructor(data: ProductProjection) {
    super();
    this.product = data;
  }

  render() {
    this.content = new Container('item-card__size-selection').render();
    const sizeHeader = new Heading(2, 'size-selection__heading', 'Choose the size:').render();
    const addToCart = new Button('Add to Cart', 'button', 'item-card__add-btn').render();

    const { variants } = this.product;
    const sizeVariants: SizeValue[] = [];
    variants.forEach((variant) => {
      variant.attributes?.forEach((attribute) => {
        if (attribute.name === 'size' || attribute.name === 'size-w') {
          sizeVariants.push(attribute.value);
        }
      });
    });

    if (sizeVariants) {
      const sizeElementContainer = new Container('item-card__size-elements').render();
      sizeVariants?.forEach((size) => {
        const elContainer = new Container('item-card__size-el-container').render();
        const sizeElInput = new Input('size', 2, 'item-card__size-input', '', 'radio').render() as HTMLInputElement;
        sizeElInput.value = size.label;
        const sizeElText = new Label('size', `${sizeElInput.value}`, 'item-card__size-el-text').render();
        elContainer.append(sizeElInput, sizeElText);
        sizeElementContainer.append(elContainer);
      });
      this.content.append(sizeHeader, sizeElementContainer, addToCart);
    }

    return this.content;
  }
}
