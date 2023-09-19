import validateEmail from '../validateEmail';

describe('validateEmail function test', () => {
  it('should return empty string when correct value passed', () => {
    expect(validateEmail('aaa@gmail.com')).toBe('');
  });

  it('should return error message when mail with invalid characters passed', () => {
    expect(validateEmail('a!aa@gmail.com')).toContain(`•Invalid characters in mail address name.\n`);
  });

  it('should return error message when mail with no @ sign passed', () => {
    expect(validateEmail('aaagmail.com')).toContain(
      `•Email address must contain an '@' symbol separating local part and domain name.\n`
    );
  });

  it('should return error message when mail with trailing whitespaces passed', () => {
    expect(validateEmail('aaa@gmail.com  ')).toContain(
      `•Email address must not contain leading or trailing whitespace.\n`
    );
  });

  it('should return error message when mail with no domain passed', () => {
    expect(validateEmail('aaa@gmail')).toContain(`•Wrong mail domain.\n`);
  });

  it('should return error message when mail with no domain passed', () => {
    expect(validateEmail('aaa@gmail')).toContain(`•Wrong mail domain.\n`);
  });
});
