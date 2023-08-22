import { CryptoMock } from '../../UI/tests/mockElements';
import DesktopHeader from './DesktopHeader';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('DesktopHeader components renders correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const header = new DesktopHeader().render();

  it('should return DIV as a container element', () => {
    expect(header.tagName).toBe('DIV');
  });

  it('should render Log In link for unauthorized user', () => {
    const link = header.querySelector("[href='/login/']");
    expect(link?.textContent).toBe('Log In');
  });

  it('should render Register link for unauthorized user', () => {
    const link = header.querySelector("[href='/register/']");
    expect(link?.textContent).toBe('Register');
  });
});
