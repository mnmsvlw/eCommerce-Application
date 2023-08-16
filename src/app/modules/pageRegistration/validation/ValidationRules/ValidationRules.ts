export default class ValidationRules {
  email(value: string): boolean {
    const mailPattern = /\S+@\S+\.\S+/;
    return mailPattern.test(value);
  }

  password(value: string): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(value);
  }

  name(value: string): boolean {
    return /^[a-zA-Zа-яА-Я]+$/.test(value);
  }

  dateOfBirth(data: string): boolean {
    const today = new Date();
    const birthDate = new Date(data);
    const minAge = 13;
    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    return birthDate < minAgeDate;
  }

  street(value: string): boolean {
    return /^[a-zA-Zа-яА-Я]+$/.test(value);
  }

  city(value: string): boolean {
    return /^[a-zA-Zа-яА-Я]+$/.test(value);
  }

  postalCode(value: string): boolean {
    return /^\d{5}$/.test(value);
  }

  country(value: string): boolean {
    return value !== '';
  }
}
