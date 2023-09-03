import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default class SwiperSlider {
  init = (selector: string, nextBtn?: string, prevBtn?: string, paginationEl?: string) => {
    const swiper = new Swiper(`${selector}`, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 5,
      touchMoveStopPropagation: true,
      observer: true,
      observeParents: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: `${nextBtn || '.swiper-button-next'}`,
        prevEl: `${prevBtn || '.swiper-button-prev'}`,
      },
      pagination: {
        el: `${paginationEl || '.swiper-pagination'}`,
        clickable: true,
      },
    });
    console.log(swiper);
  };
}
