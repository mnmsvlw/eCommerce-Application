import Component from '../../components/Component';
import Profile from '../../components/Profile/Profile';
import AddressesModule from './AddressesModule';
import EmailPassModule from './EmailPassModule';
import PersonalInfoModule from './PersonalInfoModule';

export default class ProfileModule extends Component {
  render = () => {
    document.addEventListener('click', (e) => console.log(e.target));
    this.content = new Profile().render();
    const box = this.content.querySelector('.wrapp-form') as HTMLElement;
    const menu = this.content.querySelector('.menu') as HTMLElement;
    this.content.querySelectorAll('.red').forEach((elem) => elem.classList.remove('red'));

    const page = sessionStorage.getItem('page');

    if (page === null || page === 'info') {
      box.append(new PersonalInfoModule().render());
      (menu.querySelector('.info-item') as HTMLElement).classList.add('red');
    }

    if (page === 'email') {
      box.append(new EmailPassModule().render());
      (menu.querySelector('.email-item') as HTMLElement).classList.add('red');
    }

    if (page === 'address') {
      box.classList.add('address');
      box.append(new AddressesModule().render());
      (menu.querySelector('.address-item') as HTMLElement).classList.add('red');
    }

    this.changeBlock(menu, box);
    return this.content;
  };

  changeBlock(elem1: HTMLElement, elem2: HTMLElement): void {
    elem1.addEventListener('click', (e) => {
      const box = elem2;
      const el = e.target as HTMLElement;

      if (el.classList.contains('info-item')) {
        this.content.querySelectorAll('.red').forEach((elem) => elem.classList.remove('red'));
        el.classList.add('red');
        box.textContent = '';
        box.append(new PersonalInfoModule().render());
        this.content.querySelectorAll('.wrapp-form').forEach((elem) => elem.classList.remove('address'));
      }

      if (el.classList.contains('email-item')) {
        this.content.querySelectorAll('.red').forEach((elem) => elem.classList.remove('red'));
        el.classList.add('red');
        box.textContent = '';
        box.append(new EmailPassModule().render());
        this.content.querySelectorAll('.wrapp-form').forEach((elem) => elem.classList.remove('address'));
      }

      if (el.classList.contains('address-item')) {
        this.content.querySelectorAll('.red').forEach((elem) => elem.classList.remove('red'));
        el.classList.add('red');
        box.textContent = '';
        box.classList.add('address');
        box.append(new AddressesModule().render());
      }
    });
  }
}
