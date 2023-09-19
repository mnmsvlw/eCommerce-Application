import Input from '../Input';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Input', () => {
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
    const inputName = 'username';
    const inputSize = 20;
    const classNames = 'input-field';
    const inputPlaceholder = 'Enter your username';
    const inputType = 'text';

    const input = new Input(inputName, inputSize, classNames, inputPlaceholder, inputType);

    expect(input.inputName).toBe(inputName);
    expect(input.inputSize).toBe(inputSize);
    expect(input.classNames).toBe(classNames);
    expect(input.inputPlaceholder).toBe(inputPlaceholder);
    expect(input.type).toBe(inputType);
  });
});
