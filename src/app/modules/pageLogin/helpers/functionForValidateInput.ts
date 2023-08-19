export const changeStyleBorder = (elem: HTMLInputElement): void => {
  const el = elem;
  if (el.value === '') {
    el.style.border = '2px solid red';
    setTimeout(() => {
      el.style.border = '1px solid black';
    }, 1000);
  }
};

export const showError = (el: string, message?: string, value?: string): void => {
  const error = document.querySelector(el) as HTMLElement;
  if (message) {
    error.textContent = message;
    error.style.display = 'block';
  }
  if (value === '') {
    error.style.display = 'none';
  }
};

export const hideError = (el: string): void => {
  const error = document.querySelector(el) as HTMLElement;
  error.textContent = '';
  error.style.display = 'none';
};

export const focucBlurInput = (elem: HTMLInputElement): void => {
  const el = elem;
  if (el.value === '') {
    el.style.border = '2px solid black';
  }
};
