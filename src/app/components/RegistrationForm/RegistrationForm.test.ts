import { CryptoMock } from '../../UI/tests/mockElements';
import RegistrationForm from './RegistrationForm';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('DesktopHeader components renders correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const regForm = new RegistrationForm().render();

  it('should return FORM as a container element', () => {
    expect(regForm.tagName).toBe('DIV');
  });

  it('should render registration form header', () => {
    const regFormHeader = regForm.querySelector('.regform-header');
    expect(regFormHeader?.textContent).toBe('Sign up');
  });

  it('should contain link to login page', () => {
    const regFormHeader = regForm.querySelector('.regform-login-btn') as HTMLLinkElement;
    expect(regFormHeader.href).toContain('/login/');
  });

  it('should contain data fields container', () => {
    const regFormHeader = regForm.querySelector('.regform-container__data');
    expect(regFormHeader?.tagName).toBe('DIV');
  });

  it('should contain shipping address container', () => {
    const regFormHeader = regForm.querySelector('.regform-container__shipping-address');
    expect(regFormHeader?.tagName).toBe('DIV');
  });

  it('should contain billing address container', () => {
    const regFormHeader = regForm.querySelector('.regform-container__billing-address');
    expect(regFormHeader?.tagName).toBe('DIV');
  });
});
