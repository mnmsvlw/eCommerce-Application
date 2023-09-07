import { CryptoMock } from '../../UI/tests/mockElements';
import ProfileModule from './ProfileModule';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('ProfileModule component renders correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const profile = new ProfileModule().render();

  it('should return DIV as a container element', () => {
    expect(profile.tagName).toBe('DIV');
  });

  it('should render wrapper container', () => {
    expect(profile.className).toBe('wrapper-profile');
  });
});
