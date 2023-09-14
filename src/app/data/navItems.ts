import { NavItem } from '../../types/dataTypes';

const navItemsUnauthorized: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Catalog', href: '/items/' },
  { title: 'About Us', href: '/about-us/' },
  { title: 'Log In', href: '/login/' },
  { title: 'Register', href: '/register/' },
];

const navItemsAuthorized: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Catalog', href: '/items/' },
  { title: 'Profile', href: '/profile/' },
  { title: 'About Us', href: '/about-us/' },
  { title: 'Log Out', href: '/logout/' },
];

export { navItemsUnauthorized, navItemsAuthorized };
