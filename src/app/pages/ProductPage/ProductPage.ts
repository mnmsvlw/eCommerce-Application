import Header from '../../modules/Header/Header';
import ProductModule from '../../modules/ProductModule/ProductModule';
import SwiperSlider from '../../utils/Swiper';
import listenBurger from '../helpers/listenBurger';
import Page from '../Page';

export default class RegisterPage extends Page {
  async create() {
    this.page.appendChild(new Header().render());
    listenBurger(this.page);
    const productModule = new ProductModule();
    this.page.appendChild(await productModule.renderEl('10'));
    new SwiperSlider().init();
  }
}
