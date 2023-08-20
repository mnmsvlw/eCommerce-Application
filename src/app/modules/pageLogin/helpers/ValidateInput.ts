import { focucBlurInput, hideError, showError } from './functionForValidateInput';

export default function isValidInput(
  elem: HTMLInputElement,
  errorClass: string,
  validator: (value: string) => string
): boolean {
  const { value } = elem;
  const el = elem;
  let valid = false;
  if (value === '') {
    hideError(errorClass);
    focucBlurInput(el);
  }
  const message = validator(value);
  if (message !== '') {
    showError(errorClass, message, value);
    el.style.borderBottom = '3px solid #C10C99';
  } else if (message === '') {
    hideError(errorClass);
    el.style.borderBottom = '3px solid green';
    valid = true;
  }
  el.onblur = () => focucBlurInput(el);
  el.onfocus = () => focucBlurInput(el);

  return valid;
}
