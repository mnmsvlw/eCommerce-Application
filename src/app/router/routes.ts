import { Route } from '../../types/routerTypes';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const routes: Route[] = [
  { path: /^\/$/, element: () => new MainPage() },
  { path: /^\/items\/$/, element: () => new CatalogPage() },
  { path: /^\/profile\/$/, element: () => new ProfilePage() },
  { path: /^\/register\/$/, element: () => new RegisterPage() },
  { path: /^\/login\/$/, element: () => new LoginPage() },
  // { path: /^\/login\/register\/$/, element: () => new RegisterPage() },
  {
    path: /^\/items\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/$/,
    element: () => new CatalogPage(),
  },
];

export default routes;
