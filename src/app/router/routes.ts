import { Route } from '../../types/routerTypes';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ItemPage from '../pages/ItemPage/ItemPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import MainPage from '../pages/MainPage/MainPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const routes: Route[] = [
  { title: 'Main | E-Commerce Application', path: /^\/$/, element: () => new MainPage() },
  { title: 'Catalog | E-Commerce Application', path: /^\/items\/$/, element: () => new CatalogPage() },
  { title: 'Profile | E-Commerce Application', path: /^\/profile\/$/, element: () => new ProfilePage() },
  {
    title: 'Register | E-Commerce Application',
    path: /^\/register\/$/,
    element: () => new RegisterPage(),
    accessRules: { isForUnauthorizedOnly: true },
    redirect: '/',
  },
  {
    title: 'Log In | E-Commerce Application',
    path: /^\/login\/$/,
    element: () => new LoginPage(),
    accessRules: { isForUnauthorizedOnly: true },
    redirect: '/',
  },
  {
    title: 'Log Out | E-Commerce Application',
    path: /^\/logout\/$/,
    element: () => new LogoutPage(),
    accessRules: { isForAuthorizedOnly: true },
    redirect: '/',
  },
  {
    title: 'Catalog | E-Commerce Application',
    path: /^\/items\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/$/,
    element: () => new ItemPage(),
  },
];

export default routes;
