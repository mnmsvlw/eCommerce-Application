import validateEmail from '../../../LoginModule/helpers/validateEmail';
import validatePassword from '../../../LoginModule/helpers/validatePassword';

export default class ValidationRules {
  email(value: string): boolean {
    // const mailPattern = /^\S+@\S+\.\S+$/;
    // return mailPattern.test(value);
    return validateEmail(value) === '';
  }

  password(value: string): boolean {
    // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).{8,}$/;
    return validatePassword(value) === '';
  }

  name(value: string): boolean {
    return /^(?!\s)(?!.*\s$)[a-zA-Zа-яА-Я\s]+$/.test(value);
  }

  dateOfBirth(data: string): boolean {
    const today = new Date();
    const birthDate = new Date(data);
    const minAge = 13;
    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    return birthDate < minAgeDate;
  }

  street(value: string): boolean {
    return /^(\d+)?\s*([a-zA-Zа-яА-Я].*)$/.test(value);
  }

  city(value: string): boolean {
    return /^[a-zA-Zа-яА-Я\s]+$/.test(value);
  }

  postalCode(value: string): boolean {
    return /^\d{4}$/.test(value);
  }

  postalCodeAZ(value: string): boolean {
    return /^(AZ\s?)?\d{4}$/.test(value);
  }

  country(value: string): boolean {
    return value !== '';
  }
}
