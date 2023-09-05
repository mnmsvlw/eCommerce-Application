import Img from '../Img';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Image', () => {
  let originalRandomUUID: typeof crypto.randomUUID;

  beforeEach(() => {
    originalRandomUUID = crypto.randomUUID;
    crypto.randomUUID = cryptoMock.randomUUID;
  });

  afterEach(() => {
    crypto.randomUUID = originalRandomUUID;
    jest.clearAllMocks();
  });

  it('should create an instance with the correct properties', () => {
    const url = './path/to/image';
    const alt = 'test-image';
    const image = new Img(url, alt);
    expect(image.src).toBe(url);
    expect(image.alt).toBe(alt);
  });
});
