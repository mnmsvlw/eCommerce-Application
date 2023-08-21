import Form from '../Form';
import { CryptoMock } from './mockElements';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('Form', () => {
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
    const action = '/submit';
    const method = 'post';
    const classNames = '.form';
    const form = new Form(action, method, classNames);

    expect(form.action).toBe(action);
    expect(form.method).toBe(method);
    expect(form.classNames).toBe(classNames);
  });
});
