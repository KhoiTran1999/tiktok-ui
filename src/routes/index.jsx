import DefaultLayout from '../Layouts/DefaultLayout';
import HeaderOnlyLayout from '../Layouts/HeaderOnlyLayout';
import HeaderAndSidebarLayout from '../Layouts/HeaderAndSidebarLayout';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Live from '../pages/Live';
import Profile from '../pages/Profile';
import routes from '../config/routes';

const publicRoutes = [
    { path: routes.home, page: Home, layout: DefaultLayout },
    { path: routes.foryou, page: Home, layout: DefaultLayout },
    { path: routes.following, page: Following, layout: HeaderAndSidebarLayout },
    { path: routes.profile, page: Profile, layout: HeaderAndSidebarLayout },
    { path: routes.live, page: Live, layout: HeaderOnlyLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
