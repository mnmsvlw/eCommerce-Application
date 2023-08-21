import Select from '../Select';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Select', () => {
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
    const name = 'country';
    const options = [
      { value: 'GE', text: 'Georgia' },
      { value: 'AM', text: 'Armenia' },
    ];
    const defaultText = 'Select a country';
    const classNames = '.select';

    const select = new Select(name, options, defaultText, classNames);

    expect(select.name).toBe(name);
    expect(select.options).toBe(options);
    expect(select.defaultText).toBe(defaultText);
    expect(select.classNames).toBe(classNames);
  });
});
