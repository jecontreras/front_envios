import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegacion',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Home',
        type: 'item',
        url: '/dashboard/home',
        icon: 'feather icon-home'
      },
      {
        id: 'tablero',
        title: 'Tablero',
        type: 'item',
        url: '/dashboard/tablero',
        icon: 'feather icon-home'
      },
      {
        id: 'referidos',
        title: 'Referidos',
        type: 'item',
        url: '/dashboard/referidos',
        icon: 'feather icon-home'
      },
      {
        id: 'lider',
        title: 'Lider',
        type: 'item',
        url: '/dashboard/lider',
        icon: 'feather icon-home'
      },
      {
        id: 'mis_publicaciones',
        title: 'Mis Publicaciones',
        type: 'item',
        url: '/dashboard/mispublicacion',
        icon: 'feather icon-home'
      },
    ]
  },
  {
    id: 'retiros',
    title: 'TAREAS & GANA DINERO',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'tareasDiarias',
        title: 'Tareas Diarias Anuncios',
        type: 'item',
        url: '/dashboard/tareasdiarias',
        icon: 'feather icon-home'
      },
      {
        id: 'tareasMini',
        title: 'Tareas Mini Anuncios',
        type: 'item',
        url: '/dashboard/tareasmini',
        icon: 'feather icon-home'
      },
      {
        id: 'tareasMega',
        title: 'Tareas Mega Anuncios',
        type: 'item',
        url: '/dashboard/tareasmega',
        icon: 'feather icon-home'
      },
    ]
  },
  {
    id: 'retiros',
    title: 'RETIROS Y DINEROS & BANCOS',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'retiros',
        title: 'Retiros de dineros',
        type: 'item',
        url: '/dashboard/retiros',
        icon: 'feather icon-home'
      },
      {
        id: 'bancos',
        title: 'Bancos',
        type: 'item',
        url: '/dashboard/bancos',
        icon: 'feather icon-home'
      },
    ]
  },
  {
    id: 'userPaquete',
    title: 'PAQUETES & INFORMACION',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'paquetes',
        title: 'Paquetes',
        type: 'item',
        url: '/dashboard/paquetes',
        icon: 'feather icon-home'
      }
    ]
  },
  {
    id: 'perfilUser',
    title: 'PERFIL & INFORMACION',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'perfil',
        title: 'Perfil',
        type: 'item',
        url: '/dashboard/perfil',
        icon: 'feather icon-home'
      },
    ]
  },
  {
    id: 'ayudas',
    title: 'AYUDA',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'categoria',
        title: 'Categorias',
        type: 'item',
        url: '/dashboard/categorias',
        icon: 'feather icon-home'
      },
      {
        id: 'servicioCliente',
        title: 'Servicio al Cliente',
        type: 'item',
        url: '/dashboard/servicioCliente',
        icon: 'feather icon-home'
      },
    ]
  },

  // {
  //   id: 'ui-element',
  //   title: 'UI ELEMENT & FORMS',
  //   type: 'group',
  //   icon: 'feather icon-layers',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Basic',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'alert',
  //           title: 'Alert',
  //           type: 'item',
  //           url: '/basic/alert'
  //         },
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumbs & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'cards',
  //           title: 'Cards',
  //           type: 'item',
  //           url: '/basic/cards'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'carousel',
  //           title: 'Carousel',
  //           type: 'item',
  //           url: '/basic/carousel'
  //         },
  //         {
  //           id: 'grid-system',
  //           title: 'Grid System',
  //           type: 'item',
  //           url: '/basic/grid-system'
  //         },
  //         {
  //           id: 'progress',
  //           title: 'Progress',
  //           type: 'item',
  //           url: '/basic/progress'
  //         },
  //         {
  //           id: 'modal',
  //           title: 'Modal',
  //           type: 'item',
  //           url: '/basic/modal'
  //         },
  //         {
  //           id: 'spinner',
  //           title: 'Spinner',
  //           type: 'item',
  //           url: '/basic/spinner'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         },
  //         {
  //           id: 'tooltip-popovers',
  //           title: 'Tooltip & Popovers',
  //           type: 'item',
  //           url: '/basic/tooltip-popovers'
  //         },
  //         {
  //           id: 'other',
  //           title: 'Other',
  //           type: 'item',
  //           url: '/basic/other'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       icon: 'feather icon-file-text'
  //     }
  //   ]
  // },
  // {
  //   id: 'table',
  //   title: 'Table & Charts',
  //   type: 'group',
  //   icon: 'feather icon-list',
  //   children: [
  //     {
  //       id: 'bootstrap',
  //       title: 'Bootstrap Table',
  //       type: 'item',
  //       url: '/tbl-bootstrap/bt-basic',
  //       icon: 'feather icon-server'
  //     },
  //     {
  //       id: 'apex',
  //       title: 'Apex Chart',
  //       type: 'item',
  //       url: '/charts/apex',
  //       icon: 'feather icon-pie-chart'
  //     }
  //   ]
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'feather icon-file-text',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'reset-password',
  //           title: 'Reset Password',
  //           type: 'item',
  //           url: '/auth/reset-password',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'change-password',
  //           title: 'Change Password',
  //           type: 'item',
  //           url: '/auth/change-password',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'maintenance',
  //       title: 'Maintenance',
  //       type: 'collapse',
  //       icon: 'feather icon-sliders',
  //       children: [
  //         {
  //           id: 'error',
  //           title: 'Error',
  //           type: 'item',
  //           url: '/maintenance/error',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'coming-soon',
  //           title: 'Maintenance',
  //           type: 'item',
  //           url: '/maintenance/coming-soon',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'feather icon-align-left',
  //   children: [
  //     {
  //       id: 'menu-level',
  //       title: 'Menu Levels',
  //       type: 'collapse',
  //       icon: 'feather icon-menu',
  //       children: [
  //         {
  //           id: 'menu-level-2.1',
  //           title: 'Menu Level 2.1',
  //           type: 'item',
  //           url: 'javascript:',
  //           external: true
  //         },
  //         {
  //           id: 'menu-level-2.2',
  //           title: 'Menu Level 2.2',
  //           type: 'collapse',
  //           children: [
  //             {
  //               id: 'menu-level-2.2.1',
  //               title: 'Menu Level 2.2.1',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-2.2.2',
  //               title: 'Menu Level 2.2.2',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     }
  //   ]
  // }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
