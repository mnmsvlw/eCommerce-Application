import ValidationRules from './ValidationRules';

describe('ValidationRules', () => {
  let validationRules: ValidationRules;

  beforeEach(() => {
    validationRules = new ValidationRules();
  });

  describe('email', () => {
    it('should return true for a valid email', () => {
      expect(validationRules.email('test@example.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
      expect(validationRules.email('invalid_email')).toBe(false);
    });
  });

  describe('password', () => {
    it('should return true for a valid password', () => {
      expect(validationRules.password('Test1234')).toBe(true);
    });

    it('should return false for an invalid password', () => {
      expect(validationRules.password('invalid_password')).toBe(false);
    });
  });

  describe('name', () => {
    it('should return true for a valid name', () => {
      expect(validationRules.name('Vika')).toBe(true);
    });

    it('should return false for an invalid name', () => {
      expect(validationRules.name('Vika123')).toBe(false);
    });
  });

  describe('dateOfBirth', () => {
    it('should return true for a valid date of birth', () => {
      const validDOB = '1998-05-13';
      expect(validationRules.dateOfBirth(validDOB)).toBe(true);
    });

    it('should return false for an invalid date of birth', () => {
      const invalidDOB = '2011-05-13';
      expect(validationRules.dateOfBirth(invalidDOB)).toBe(false);
    });
  });

  describe('street', () => {
    it('should return true for a valid street', () => {
      expect(validationRules.street('123 Main St')).toBe(true);
    });

    it('should return false for an invalid street', () => {
      expect(validationRules.street('')).toBe(false);
    });
  });

  describe('city', () => {
    it('should return true for a valid city', () => {
      expect(validationRules.city('New York')).toBe(true);
    });

    it('should return false for an invalid city', () => {
      expect(validationRules.city('123 City')).toBe(false);
    });
  });

  describe('postalCode', () => {
    it('should return true for a valid postal code', () => {
      expect(validationRules.postalCode('1234')).toBe(true);
    });

    it('should return false for an invalid postal code', () => {
      expect(validationRules.postalCode('ABCD')).toBe(false);
    });
  });

  describe('country', () => {
    it('should return true for a valid country', () => {
      expect(validationRules.country('Georgia')).toBe(true);
    });

    it('should return false for an invalid country', () => {
      expect(validationRules.country('')).toBe(false);
    });
  });
});
