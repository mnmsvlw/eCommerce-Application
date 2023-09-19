import validatePassword from '../validatePassword';

describe('validatePassword function test', () => {
  it('should return empty string when correct value passed', () => {
    expect(validatePassword('12345Qw!')).toBe('');
  });

  it('should return error message when password without uppercase letters passed', () => {
    expect(validatePassword('12345qw!')).toContain(`•Password must contain at least one uppercase letter (A-Z).\n`);
  });

  it('should return error message when password without lowercase letters passed', () => {
    expect(validatePassword('12345QW!')).toContain(`•Password must contain at least one lowercase letter (a-z).\n`);
  });

  it('should return error message when password without digits passed', () => {
    expect(validatePassword('Abcdefg!')).toContain(`•Password must contain at least one digit (0-9).\n`);
  });

  it('should return error message when password less than 8 characters long passed', () => {
    expect(validatePassword('Abcdef!')).toContain(`•Password must be at least 8 characters long.\n`);
  });

  it('should return error message when password with trailing whitespaces passed', () => {
    expect(validatePassword('Abcdefg! ')).toContain(`•Password must not contain leading or trailing whitespace\n`);
  });

  it('should return error message when password without special characters passed', () => {
    expect(validatePassword('Abcdefg1')).toContain(
      `•Password must contain at least one special character (e.g., !@#$%^&*).`
    );
  });
});
