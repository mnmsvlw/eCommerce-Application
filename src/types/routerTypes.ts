import Page from '../app/pages/Page';

export type Route = {
  title: string;
  path: RegExp;
  element: () => Page;
  accessRules?: {
    isForAuthorizedOnly?: boolean;
    isForUnauthorizedOnly?: boolean;
  };
  redirect?: string;
};
