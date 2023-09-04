import { CryptoMock } from '../../../UI/tests/mockElements';
import ZoomProductSlider from './ZoomSlider';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

const mockImages = [
  { dimensions: { w: 700, h: 420 }, url: 'path/to/image-1' },
  { dimensions: { w: 700, h: 420 }, url: 'path/to/image-1' },
];

describe('Zoom slider components renders correct html elements', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const slider = new ZoomProductSlider(mockImages).render();

  it('should return slider as a container element', () => {
    expect(slider.tagName).toBe('DIV');
  });

  it('should contain the following class - zoom-swiper', () => {
    expect(slider.className).toBe('zoom-swiper');
  });

  it('should contain swiper slides for each image', () => {
    const swiperSlides = slider.querySelectorAll('.swiper-slide');
    expect(swiperSlides.length).toBe(mockImages.length);
  });

  it('should contain swiper pagination', () => {
    const swiperPagination = slider.querySelector('.swiper-pagination');
    expect(swiperPagination).not.toBeNull();
  });

  it('should contain swiper previous button', () => {
    const swiperButtonPrev = slider.querySelector('.swiper-button-prev');
    expect(swiperButtonPrev).not.toBeNull();
  });

  it('should contain swiper next button', () => {
    const swiperButtonNext = slider.querySelector('.swiper-button-next');
    expect(swiperButtonNext).not.toBeNull();
  });
});
