import routes from '../config/routes';
import ProfileLayout from '../Layouts/ProfileLayout';
import LiveLayout from '../Layouts/LiveLayout';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import { MessagesLayout } from '../Layouts/MessagesLayout';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Live from '../pages/Live';
import MessagesPage from '../pages/MessagesPage';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import UploadLayout from '../Layouts/UploadLayout/UploadLayout';

const publicRoutes = [
    { path: routes.home, page: Home, layout: MainLayout },
    { path: routes.following, page: Following, layout: MainLayout },
    { path: routes.profile, page: Profile, layout: ProfileLayout },
    { path: routes.live, page: Live, layout: LiveLayout },
    { path: routes.messages, page: MessagesPage, layout: MessagesLayout },
    { path: routes.upload, page: Upload, layout: UploadLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
