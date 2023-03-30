import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Menu from '../../ReusedComponent/Menu';
import config from '../../../config';
import style from './NavMenu.module.scss';
import HomeLogo from '../../../assets/icon/HomeLogo';
import HomeLogoActive from '../../../assets/icon/HomeLogoActive';
import UserGroupLogo from '../../../assets/icon/UserGroupLogo';
import UserGroupLogoActive from '../../../assets/icon/UserGroupLogoActive';
import LiveIcon from '../../../assets/icon/LiveIcon';
import LiveIconActive from '../../../assets/icon/LiveIconActive';

const cx = classNames.bind(style);
const NavMenu = () => {
    const { t } = useTranslation(); //Remember translate here
    const NavMenuData = [
        {
            icon: <HomeLogo />,
            activeIcon: <HomeLogoActive />,
            title: 'For You',
            to: config.routes.home,
        },
        {
            icon: <UserGroupLogo />,
            activeIcon: <UserGroupLogoActive />,
            title: 'Following',
            to: config.routes.following,
        },
        {
            icon: <LiveIcon />,
            activeIcon: <LiveIconActive />,
            title: 'LIVE',
            to: config.routes.live,
        },
    ];
    return (
        <div className={cx('menu-nav')}>
            <Menu data={NavMenuData} />
        </div>
    );
};

export default NavMenu;
