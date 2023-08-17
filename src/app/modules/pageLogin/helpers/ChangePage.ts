const changePage = (namePage: string): void => {
  const url = `${window.location.origin}${namePage}`;
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event('popstate'));
};

export default changePage;
