const updateQueryString = (params: { [index: string]: string }) => {
  const currentUrl = new URL(window.location.href);

  if (currentUrl.pathname.endsWith('/')) {
    currentUrl.pathname = currentUrl.pathname.slice(0, -1);
  }

  Object.keys(params).forEach((key) => {
    currentUrl.searchParams.set(key, params[key]);
  });

  window.history.pushState(null, '', currentUrl);

  const event = new Event('queryUpdated');
  window.dispatchEvent(event);
};

export default updateQueryString;
