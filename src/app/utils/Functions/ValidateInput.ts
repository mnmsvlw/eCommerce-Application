function showError(el: string, message: string, value: string): void {
  const error = document.querySelector(el) as HTMLElement;
  error.textContent = message;
  error.style.display = 'block';
  if (value === '') {
    error.style.display = 'none';
  }
}

function hideError(el: string): void {
  const error = document.querySelector(el) as HTMLElement;
  error.textContent = '';
  error.style.display = 'none';
}

export default function isValidInput(elem: HTMLInputElement, errorClass: string, validator: (value: string) => string): boolean {
  const { value } = elem;
  const el = elem;
  let valid = false;
  if (value === '') {
    hideError(errorClass);
    el.style.border = '2px solid black';
  }
  const message = validator(value);
  if (message !== '') {
    showError(errorClass, message, value);
    el.style.border = '3px solid red';
  } else if (message === '') {
    hideError(errorClass);
    el.style.border = '3px solid green';
    valid = true;
  }
  el.onblur = () => {
    if (el.value === '') {
      el.style.border = '2px solid black';
    }
  };
  el.onfocus = () => {
    if (el.value === '') {
      el.style.border = '2px solid black';
    }
  };
  return valid;
}