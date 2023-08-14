import Page from '../app/pages/Page';

export type Route = {
  path: RegExp;
  element: () => Page;
};
