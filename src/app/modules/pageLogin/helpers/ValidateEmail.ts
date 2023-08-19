export default function validateEmail(email: string): string {
  const re =
    /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  const valid = re.test(email);
  const ename = /^[0-9a-z]{1}[-_0-9a-z.]{0,30}[0-9a-z]{0,30}$/i.test(email.toLowerCase().split('@')[0]);
  const edog = /^([-_0-9a-z.]+@)/.test(email.toLowerCase());
  const edog1 = [...email].filter((x) => x === '@').length === 1;
  const domain = email.split('@')[1];
  const space = email[0] !== ' ' && email[email.length - 1] !== ' ';
  const domen = /[\w-]+\.[a-z]{2,3}$/i.test(domain);
  let message = '';
  if (!ename) message += `•Invalid characters in mail address name.\n`;
  if (!edog) message += `•Email address must contain an '@' symbol separating \nlocal part and domain name.\n`;
  if (!edog1 && edog) message += `•Email address must contain 1 an "@" symbol.\n`;
  if (!space) message += `•Email address must not contain leading or trailing whitespace.\n`;
  if (!domen) message += `•Wrong mail domain.\n`;
  if (!valid) message += `•Please enter a valid email address.\n`;

  return message;
}
