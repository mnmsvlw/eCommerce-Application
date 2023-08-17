import Component from '../../components/Component';
import LogoutForm from '../../components/LoginForm/LogoutForm/LogoutForm';
import navItems from '../../data/navItems';
import changePage from '../../modules/pageLogin/helpers/ChangePage';

export default class PageLogout extends Component {
  render = () => {
    this.content = new LogoutForm().render();
    this.content.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      if (el.classList.contains('yesBtn')) {
        navItems.map((x) => {
          const a = x;
          if (a.href === 'Profile') {
            a.title = 'Profile';
          }
          if (a.title === 'Logout') {
            a.title = 'Login';
            a.href = '/Login/';
          }
          return a;
        });
        changePage('/login/');
      }
      if (el.classList.contains('noBtn')) {
        e.preventDefault();
        changePage('/');
      }
    });
    return this.content;
  };
}
