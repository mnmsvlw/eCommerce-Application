import { CryptoMock } from '../../../../UI/tests/mockElements';
import CatalogSidebar from './CatalogSidebar';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('CatalogSidebar components render correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const sidebar = new CatalogSidebar();

  it('should return DIV as a container element', () => {
    expect(sidebar.render().tagName).toBe('DIV');
  });

  it('should render Categories container', () => {
    const container = sidebar.render().querySelector('.sidebar__categories');
    expect(container?.firstChild?.textContent).toBe('Categoriesreset');
  });

  it('should render Price container', () => {
    const container = sidebar.render().querySelector('.sidebar__price');
    expect(container?.firstChild?.textContent).toBe('Pricereset');
  });

  it('should render Color container', () => {
    const container = sidebar.render().querySelector('.sidebar__color');
    expect(container?.firstChild?.textContent).toBe('Colorreset');
  });

  it('should render Size container', () => {
    const container = sidebar.render().querySelector('.sidebar__size');
    expect(container?.firstChild?.textContent).toBe('Sizereset');
  });

  it('should use renderAsync properly', () => {
    const itemsListAsync = sidebar.render();
    sidebar.renderAsync(itemsListAsync);
    expect(itemsListAsync.tagName).toBe('DIV');
  });
});
