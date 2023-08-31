import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default class SwiperSlider {
  init = () => {
    const swiper = new Swiper('.swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 5,
      touchMoveStopPropagation: true,
      observer: true,
      observeParents: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    console.log(swiper);
  };
}
