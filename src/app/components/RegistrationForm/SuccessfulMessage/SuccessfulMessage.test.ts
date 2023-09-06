import { CryptoMock } from '../../../UI/tests/mockElements';
import SuccessfulMessage from './SuccessfulMessage';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Success message renders correct html elements', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const successMessage = new SuccessfulMessage().render('test');

  it('should return container element', () => {
    expect(successMessage.tagName).toBe('DIV');
  });

  it('should contain the following class - message-cover', () => {
    expect(successMessage.className).toBe('message-cover');
  });

  it('should contain error message container', () => {
    const messageContainer = successMessage.querySelector('.message-container-success');
    expect(messageContainer).not.toBeNull();
  });

  it('should contain error message header', () => {
    const heading = successMessage.querySelector('.message-header');
    expect(heading).not.toBeNull();
  });
});
