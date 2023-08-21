import Heading from '../Heading';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Heading', () => {
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
    const tag = 1;
    const classNames = '.heading';
    const text = 'Hello, world!';
    const heading = new Heading(tag, classNames, text);

    expect(heading.tag).toBe(`h${tag}`);
    expect(heading.classNames).toBe(classNames);
    expect(heading.text).toBe(text);
  });
});
