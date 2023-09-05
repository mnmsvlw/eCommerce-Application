import { CryptoMock } from '../../UI/tests/mockElements';
import CatalogModule from './CatalogModule';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('DesktopHeader components renders correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const catalogModule = new CatalogModule();

  it('should return DIV as a container element', () => {
    expect(catalogModule.render().tagName).toBe('DIV');
  });

  it('should render Main container', () => {
    const container = catalogModule.render().querySelector('.right-container');
    expect(container).toBeTruthy();
  });

  it('should use renderAsync properly', () => {
    const itemsListAsync = catalogModule.render();
    catalogModule.renderAsync(itemsListAsync);
    expect(itemsListAsync.tagName).toBe('DIV');
  });
});
