import Page from '../app/pages/Page';

export type Route = {
  path: RegExp;
  element: () => Page;
  accessRules?: {
    isForAuthorizedOnly?: boolean;
    isForUnauthorizedOnly?: boolean;
  };
  redirect?: string;
};
