import Link from '../Link';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Link', () => {
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
    const href = '/path';
    const classNames = 'link';
    const text = 'Link:';

    const link = new Link(href, classNames, text);

    expect(link.href).toBe(href);
    expect(link.text).toBe(text);
    expect(link.classNames).toBe(classNames);
  });
});
