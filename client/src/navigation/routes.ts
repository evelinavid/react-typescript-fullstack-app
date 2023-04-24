const singleServicePage = '/single-service/';
const editServicePost = '/edit-service/';
const chatPage = '/chat/';
const staticRoutes = {
  AboutPage: '/',
  ServicesPage: '/services',
  RegisterPage: '/register',
  LoginPage: '/login',
  ChatPage: '/chat',
  AccountPage: '/account',
  ProfilePage: '/profile',
  PostServices: '/create-service',
};

const dynamicRoutes = {
  SingleServicePage: {
    path: `${singleServicePage}:id`,
    createLink: (id: string | number) => `${singleServicePage}${id}`,
  },
  EditPostService: {
    path: `${editServicePost}:id`,
    createLink: (id: number | string) => `${editServicePost}${id}`,
  },
  ChatUserPage: {
    path: `${chatPage}:id`,
    createLink: (id: number | string) => `${chatPage}${id}`,
  },
};

const routes = {
  ...staticRoutes,
  ...dynamicRoutes,
} as const;

export default routes;
