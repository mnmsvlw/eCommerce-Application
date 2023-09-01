import { Address } from '@commercetools/platform-sdk';
import sdkClient from '../../api/SdkClient';
import Button from '../../UI/Button';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Component from '../Component';
import ProfileAddress from './ProfileAddress';

export default class ProfileAllAddresses extends Component {
  render = () => {
    this.content = new Container('wrapper-address').render();
    const header = new Heading(3, 'headerPage', 'Addresses').render();
    const btnAddNewAddress = new Button('Add new address', 'submit', 'btnAddNewAddress').render();
    const conteiner = new Container('conteiner').render();
    const addresses = sdkClient.userInfo.addresses as Address[];
    addresses.forEach(() => {
      const box = new ProfileAddress().render();
      conteiner.append(box);
    });
    const boxSave = new Container('save-a').render();
    const btnSave = new Button('Save', 'submit', 'save-address').render();
    boxSave.append(btnSave);
    boxSave.classList.add('hide');
    this.content.append(header, btnAddNewAddress, conteiner, boxSave);
    return this.content;
  };
}
