import { NavItem } from '../../types/dataTypes';

const navItemsUnauthorized: NavItem[] = [
  { title: 'Home', href: '/' },
  // { title: 'Catalog', href: '/items/' }, For Sprint#3
  { title: 'Log In', href: '/login/' },
  { title: 'Register', href: '/register/' },
];

const navItemsAuthorized: NavItem[] = [
  { title: 'Home', href: '/' },
  // { title: 'Catalog', href: '/items/' }, For Sprint#3
  { title: 'Profile', href: '/profile/' },
  { title: 'Log Out', href: '/logout/' },
];

export { navItemsUnauthorized, navItemsAuthorized };
