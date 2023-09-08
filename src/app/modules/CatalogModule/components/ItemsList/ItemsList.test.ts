import { CryptoMock } from '../../../../UI/tests/mockElements';
import ItemsList from './ItemsList';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('ItemsList components render correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const itemsList = new ItemsList();

  it('should return DIV as a container element', () => {
    expect(itemsList.render().tagName).toBe('DIV');
  });

  it('should use renderAsync properly', () => {
    const itemsListAsync = itemsList.render();
    itemsList.renderAsync(itemsListAsync);
    expect(itemsListAsync.tagName).toBe('DIV');
  });
});
