import { CryptoMock } from '../../UI/tests/mockElements';
import AboutUs from './AboutUs';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('AboutUs component renders correctly', () => {
  crypto.randomUUID = cryptoMock.randomUUID;
  let aboutUs: HTMLElement;

  beforeEach(() => {
    aboutUs = new AboutUs().render();
  });

  it('should return DIV as a container element', () => {
    expect(aboutUs.tagName).toBe('DIV');
  });

  it('should render a link to the RS School', () => {
    const linkBox = aboutUs.querySelector('.linkBoxRs');

    const rsLink = linkBox?.querySelector('.rsLink') as HTMLAnchorElement;
    expect(rsLink.href).toBe('https://rs.school/');
  });
});
