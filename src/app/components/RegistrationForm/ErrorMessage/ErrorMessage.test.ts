import { CryptoMock } from '../../../UI/tests/mockElements';
import ErrorMessage from './ErrorMessage';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Error message renders correct html elements', () => {
  crypto.randomUUID = cryptoMock.randomUUID;
  const testErrorMessage = 'this is a test error';

  const errorMessage = new ErrorMessage().render(testErrorMessage);

  it('should return container element', () => {
    expect(errorMessage.tagName).toBe('DIV');
  });

  it('should contain the following class - message-cover', () => {
    expect(errorMessage.className).toBe('message-cover');
  });

  it('should contain error message container', () => {
    const messageContainer = errorMessage.querySelector('.message-container');
    expect(messageContainer).not.toBeNull();
  });

  it('should contain error message header', () => {
    const heading = errorMessage.querySelector('.message-header__error');
    expect(heading).not.toBeNull();
  });
});
