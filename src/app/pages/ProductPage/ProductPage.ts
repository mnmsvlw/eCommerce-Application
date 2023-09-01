import Header from '../../modules/Header/Header';
import ProductModule from '../../modules/ProductModule/ProductModule';
import SwiperSlider from '../../utils/Swiper';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class RegisterPage extends Page {
  async create() {
    this.page.appendChild(new Header().render());
    this.page.appendChild(new ProductModule().render('10'));
    listenBurger(this.page);
    new SwiperSlider().init();
  }
}
