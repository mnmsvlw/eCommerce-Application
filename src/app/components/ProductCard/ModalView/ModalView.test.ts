import { Image } from '@commercetools/platform-sdk';
import { CryptoMock } from '../../../UI/tests/mockElements';
import ModalConstructor from './ModalView';

const mockImages: Image[] = [
  { dimensions: { w: 700, h: 420 }, url: 'path/to/image-1' },
  { dimensions: { w: 700, h: 420 }, url: 'path/to/image-2' },
];

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('ModalConstructor Component', () => {
  crypto.randomUUID = cryptoMock.randomUUID;
  const modal = new ModalConstructor(mockImages);
  const modalEl = modal.render();

  it('should initialize without errors', () => {
    expect(() => {
      modal.render();
    }).not.toThrow();
  });

  it('should return modal as a container element', () => {
    expect(modalEl.tagName).toBe('DIV');
  });

  it('should contain the following class - modal__cover', () => {
    expect(modalEl.className).toBe('modal__cover open');
  });

  it('should contain modal button', () => {
    const modalBtn = modalEl.querySelector('.modal__button');
    expect(modalBtn).not.toBeNull();
  });

  it('should contain modal content container', () => {
    const modalContent = modalEl.querySelector('.modal');
    expect(modalContent).not.toBeNull();
  });
});
