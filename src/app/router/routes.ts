import { Route } from '../../types/routerTypes';
import LoginPage from '../pages/LoginPage/LoginPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const routes: Route[] = [
  { path: /^\/$/, element: () => new MainPage() },
  // For Sprint#3
  // { path: /^\/items\/$/, element: () => new CatalogPage() },
  // { path: /^\/profile\/$/, element: () => new ProfilePage() },
  {
    path: /^\/register\/$/,
    element: () => new RegisterPage(),
    accessRules: { isForUnauthorizedOnly: true },
    redirect: '/',
  },
  {
    path: /^\/login\/$/,
    element: () => new LoginPage(),
    accessRules: { isForUnauthorizedOnly: true },
    redirect: '/',
  },
  {
    path: /^\/logout\/$/,
    element: () => new LogoutPage(),
    accessRules: { isForAuthorizedOnly: true },
    redirect: '/',
  },
  // For Sprint#3
  // {
  //   path: /^\/items\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/$/,
  //   element: () => new CatalogPage(),
  // },
];

export default routes;
