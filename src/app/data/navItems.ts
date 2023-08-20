import { NavItem } from '../../types/dataTypes';

const navItemsUnauthorized: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Catalog', href: '/items/' },
  { title: 'Log In', href: '/login/' },
  { title: 'Register', href: '/register/' },
];

const navItemsAuthorized: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Catalog', href: '/items/' },
  { title: 'Log In', href: '/login/' },
  { title: 'Register', href: '/register/' },
];

export { navItemsUnauthorized, navItemsAuthorized };
