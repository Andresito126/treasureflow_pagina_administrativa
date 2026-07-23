/** Central route path constants + sidebar navigation model. */
export const ROUTES = {
  login: '/login',
  dashboard: '/',
  users: '/usuarios',
  posts: '/publicaciones',
  collections: '/recolecciones',
} as const;

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: ROUTES.dashboard, icon: 'dashboard' },
  { label: 'Usuarios', path: ROUTES.users, icon: 'group' },
  { label: 'Publicaciones', path: ROUTES.posts, icon: 'inventory_2' },
  { label: 'Recolecciones', path: ROUTES.collections, icon: 'local_shipping' },
];
