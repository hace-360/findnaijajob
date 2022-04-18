// ----------------------------------------------------------------------

const Routes = {
  home: '/',
  jobs: '/jobs',
  job: (id) => `/jobs/${id}`,
  createJob: '/jobs/create',
  posts: '/blog',
  post: (slug) => `/blog/${slug}`,
  about: '/about-us',
  contact: '/contact-us',
  login: '/account/login',
  signup: '/account/signup',
  profile: '/profile',
  settings: '/profile/setting',
  resetPassword: '/account/reset-password',
  verifyCode: '/account/verify-code',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  checkout: '/topup',
  support: '/support',
  page404: '/404',
  page500: '/500',
};

export default Routes;
