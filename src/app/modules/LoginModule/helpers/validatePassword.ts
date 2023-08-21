export default function validatePassword(password: string): string {
  const uppers = /[A-Z]/.test(password);
  const lowers = /[a-z]/.test(password);
  const numbers = /\d/.test(password);
  const symbol = /[^\w\s]/.test(password);
  const length = password.length >= 8;
  const space = password[0] !== ' ' && password[password.length - 1] !== ' ';
  let message = '';
  if (!uppers) message += `•Password must contain at least one uppercase letter (A-Z).\n`;
  if (!lowers) message += `•Password must contain at least one lowercase letter (a-z).\n`;
  if (!numbers) message += `•Password must contain at least one digit (0-9).\n`;
  if (!length) message += `•Password must be at least 8 characters long.\n`;
  if (!space) message += `•Password must not contain leading or trailing whitespace\n`;
  if (!symbol) message += `•Password must contain at least one special character (e.g., !@#$%^&*).`;
  return message;
}
