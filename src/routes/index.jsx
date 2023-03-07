import routes from '../config/routes';
import FollowingLayout from '../Layouts/FollowingLayout';
import LiveLayout from '../Layouts/LiveLayout';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Live from '../pages/Live';
import Profile from '../pages/Profile';

const publicRoutes = [
    { path: routes.home, page: Home, layout: MainLayout },
    { path: routes.following, page: Following, layout: FollowingLayout },
    { path: routes.profile, page: Profile, layout: MainLayout },
    { path: routes.live, page: Live, layout: LiveLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
