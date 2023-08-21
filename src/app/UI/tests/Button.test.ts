import Button from '../Button';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Button', () => {
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
    const text = 'Register';
    const type = 'submit';
    const classNames = '.button';
    const button = new Button(text, type, classNames);

    expect(button.text).toBe(text);
    expect(button.type).toBe(type);
    expect(button.classNames).toBe(classNames);
  });
});
