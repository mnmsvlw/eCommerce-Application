import { NavItem } from '../../types/dataTypes';

const navItemsUnauthorized: NavItem[] = [
  { title: 'Main', href: '/' },
  { title: 'Catalog', href: '/items/' },
  { title: 'Log In', href: '/login/' },
  { title: 'Register', href: '/register/' },
];

const navItemsAuthorized: NavItem[] = [
  { title: 'Main', href: '/' },
  { title: 'Catalog', href: '/items/' },
  { title: 'Profile', href: '/profile/' },
  { title: 'Log Out', href: '/logout/' },
];

export { navItemsAuthorized, navItemsUnauthorized };
