import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from '@/consts';

const applinks = [];

const adminlinks = [
   {
      name: 'dashboard',
      path: '/dashboard',
      view: 'Dashboard',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: 'Dashboard',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'exceptions',
      path: '/exceptions',
      view: 'Exceptions',
      parent: 'dashboard',
      meta: {
         order: 0,
         icon: 'mdi-alert-circle',
         title: 'Exceptions',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'users',
      path: '/users',
      view: 'Users',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-account',
         title: '用戶',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'settings',
      path: '/settings',
      view: 'Settings',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-cog-outline',
         title: '設定',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'symbols',
      path: '/symbols',
      view: 'Symbols',
      parent: 'settings',
      meta: {
         order: 0,
         icon: 'mdi-format-list-bulleted-square',
         title: 'Symbols',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'db',
      path: '/db',
      view: 'DB',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-database',
         title: '數據庫',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'histoties',
      path: '/histoties',
      view: 'Histoties',
      parent: 'db',
      meta: {
         order: 0,
         icon: 'mdi-file-table-outline',
         title: '歷史資料',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'profile',
      path: '/profile',
      view: 'Profile',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-account',
         title: 'Profile',
         type: ADMIN_ONLY,
         menu: false
      } 
   }
];

const guestLinks = [{
   name: 'Login',
   path: '/login',
   view: 'Login',
   parent: 'Dashboard',
   meta: {
      icon: 'mdi-login-variant',
      title: 'Login',
      type: GUEST_ONLY,
      menu: true
   } 
}];

let appRoutes = applinks.concat(adminlinks).concat(guestLinks);

for(let i = 0; i < appRoutes.length; i++){
   appRoutes[i].meta.order = i;
}

export default appRoutes;