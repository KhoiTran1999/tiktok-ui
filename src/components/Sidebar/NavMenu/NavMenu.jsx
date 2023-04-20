import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import HomeLogo from '../../../assets/icon/HomeLogo';
import HomeLogoActive from '../../../assets/icon/HomeLogoActive';
import LiveIcon from '../../../assets/icon/LiveIcon';
import LiveIconActive from '../../../assets/icon/LiveIconActive';
import UserGroupLogo from '../../../assets/icon/UserGroupLogo';
import UserGroupLogoActive from '../../../assets/icon/UserGroupLogoActive';
import config from '../../../config';
import style from './NavMenu.module.scss';

const cx = classNames.bind(style);
const NavMenu = () => {
    const { t } = useTranslation();
    const NavMenuData = [
        {
            icon: <HomeLogo className={cx('icon')} />,
            activeIcon: <HomeLogoActive />,
            title: t('sidebar.ForYou'),
            to: config.routes.home,
        },
        {
            icon: <UserGroupLogo className={cx('icon')} />,
            activeIcon: <UserGroupLogoActive />,
            title: t('sidebar.Following'),
            to: config.routes.following,
        },
        {
            icon: <LiveIcon className={cx('icon')} />,
            activeIcon: <LiveIconActive />,
            title: 'LIVE',
            to: config.routes.live,
        },
    ];
    const navigate = useNavigate();

    return (
        <div className={cx('menu-nav')}>
            <ul>
                {NavMenuData.map((val) => {
                    if (window.location.pathname === '/' && val.title === 'For You') {
                        return (
                            <li key={val.title} onClick={() => navigate(`${val.to}`)}>
                                <div className={cx('icons')}>{val.activeIcon}</div>
                                <span className={cx('title', 'active')}>{val.title}</span>
                            </li>
                        );
                    } else if (window.location.pathname === '/following' && val.title === 'Following') {
                        return (
                            <li key={val.title} onClick={() => navigate(`${val.to}`)}>
                                <div className={cx('icons')}>{val.activeIcon}</div>
                                <span className={cx('title', 'active')}>{val.title}</span>
                            </li>
                        );
                    }
                    return (
                        <li key={val.title} onClick={() => navigate(`${val.to}`)}>
                            <div className={cx('icons')}>{val.icon}</div>
                            <span className={cx('title')}>{val.title}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NavMenu;
