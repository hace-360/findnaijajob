// routes
import Routes from '../../routes';
// _data
import { _jobs} from '../../../_data/mock';

// ----------------------------------------------------------------------

export const PageLinks = [
  {
    order: '3',
    subheader: 'Career',
    cover: 'https://zone-assets-api.vercel.app/assets/images/menu/menu_career.jpg',
    items: [
      { title: 'Landing', path: Routes.home },
      { title: 'Jobs', path: Routes.jobs },
      { title: 'Job', path: Routes.job(_jobs[0].id) },
      { title: 'Blog Posts', path: Routes.posts },
      { title: 'Blog Post', path: Routes.post('post-01') },
      { title: 'About', path: Routes.about },
      { title: 'Contact', path: Routes.contact },
    ],
  },
];

export const navConfig = [
  { title: 'Home', path: '/' },
  { title: 'About', path: Routes.about },
  { title: 'Contact', path: Routes.contact },
  { title: 'Resume Builder', path: '/resume' },
];
