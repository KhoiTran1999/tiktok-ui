import DefaultLayout from '../Layouts/DefaultLayout';
import HeaderOnlyLayout from '../Layouts/HeaderOnlyLayout';
import HeaderAndSidebarLayout from '../Layouts/HeaderAndSidebarLayout';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Live from '../pages/Live';

const publicRoutes = [
    { path: '/', page: Home, layout: DefaultLayout },
    { path: '/foryou', page: Home, layout: DefaultLayout },
    { path: '/Following', page: Following, layout: HeaderAndSidebarLayout },
    { path: '/Live', page: Live, layout: HeaderOnlyLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
