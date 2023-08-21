import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/tables',
    label: 'Tables',
    icon: mdiTable,
  },
  {
    href: '/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline,
  },
  {
    href: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/responsive',
    label: 'Responsive',
    icon: mdiResponsive,
  },
  {
    href: '/',
    label: 'Styles',
    icon: mdiPalette,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/Users',
    label: 'Users',
    icon: mdiTable,
  },
  {
    href: '/UserAdd',
    label: 'Add User',
    icon: mdiTable,
  },
  {
    href: '/Membership',
    label: 'Memberships',
    icon: mdiTable,
  },
  {
    href: '/Playlists',
    label: 'Playlists',
    icon: mdiTable,
  },
  {
    href: '/Artists',
    label: 'Artists',
    icon: mdiTable,
  },
  {
    href: '/AddArtist',
    label: 'Add Artist',
    icon: mdiTable,
  },
  {
    href: '/Albums',
    label: 'Albums',
    icon: mdiTable,
  },

  {
    href: '/Songs',
    label: 'Songs',
    icon: mdiTable,
  },
  {
    href: '/SongAdd',
    label: 'Add Song',
    icon: mdiTable,
  },
  {
    href: '/Genres',
    label: 'Genres',
    icon: mdiTable,
  },
  {
    href: '/GenreAdd',
    label: 'Add Genre',
    icon: mdiTable,
  },
  {
    href: '/Countries',
    label: 'Countries',
    icon: mdiTable,
  },
  {
    href: '/CountryAdd',
    label: 'Add Country',
    icon: mdiTable,
  },
  {
    href: '/login',
    label: 'Login',
    icon: mdiLock,
  },
  {
    href: '/error',
    label: 'Error',
    icon: mdiAlertCircle,
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One',
      },
      {
        label: 'Item Two',
      },
    ],
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'Vue version',
    icon: mdiVuejs,
    target: '_blank',
  },
]

export default menuAside
