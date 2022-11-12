import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import listFill from '@iconify/icons-eva/file-text-fill';
import carFill from '@iconify/icons-eva/car-fill';
import logoutFill from '@iconify/icons-eva/log-out-fill';
import personFill from '@iconify/icons-eva/person-fill';
// import bannersFill from '@iconify/icons-eva/camera-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

export const config = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  {
    title: 'Cars',
    path: '/dashboard/cars',
    icon: getIcon(carFill),
  },
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: getIcon(listFill),
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon(peopleFill),
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: getIcon(logoutFill),
  },
];
