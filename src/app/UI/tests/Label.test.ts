import Label from '../Label';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Label', () => {
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
    const labelFor = 'username';
    const text = 'Username:';
    const classNames = '.label';

    const label = new Label(labelFor, text, classNames);

    expect(label.labelFor).toBe(labelFor);
    expect(label.text).toBe(text);
    expect(label.classNames).toBe(classNames);
  });
});
