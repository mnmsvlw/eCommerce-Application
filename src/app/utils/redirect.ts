const redirect = (path: string): void => {
  const url = `${window.location.origin}${path}`;
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event('popstate'));
};

export default redirect;
