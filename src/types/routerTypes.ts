import Page from '../app/pages/Page';

export type Route = {
  path: string;
  element: () => Page;
};
