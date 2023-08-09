import { Route } from '../../types/routerTypes';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import MainPage from '../pages/MainPage/MainPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const routes: Route[] = [
  { path: '/', element: new MainPage() },
  { path: '/catalog/', element: new CatalogPage() },
  { path: '/profile/', element: new ProfilePage() },
  { path: '/register/', element: new RegisterPage() },
];

export default routes;
