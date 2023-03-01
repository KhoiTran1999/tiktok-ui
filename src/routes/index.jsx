import DefaultLayout from '../Layouts/DefaultLayout';
import HeaderOnlyLayout from '../Layouts/HeaderOnlyLayout';
import HeaderAndSidebarLayout from '../Layouts/HeaderAndSidebarLayout';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Live from '../pages/Live';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/foryou', component: Home, layout: DefaultLayout },
    { path: '/Following', component: Following, layout: HeaderAndSidebarLayout },
    { path: '/Live', component: Live, layout: HeaderOnlyLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
