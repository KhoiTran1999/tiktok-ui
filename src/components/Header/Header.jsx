import classNames from 'classnames/bind';
import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoTiktok from '../../assets/icon/LogoTiktok';
import LogoTiktokDark from '../../assets/icon/LogoTiktokDark';
import routes from '../../config/routes.js';
import { DarkModeSelector, UserSelector } from '../../redux/selector';
import '../../translation/i18n.js';
import { ModalSign } from '../ReusedComponent';
import FormSearch from './FormSearch/FormSearch';
import style from './Header.module.scss';
import LoginRightHeader from './RightHeader/LoginRightHeader.jsx';
import UnloginRightHeader from './RightHeader/UnloginRightHeader.jsx';

const cx = classNames.bind(style);

const Header = ({ className }) => {
    const user = useSelector(UserSelector);
    const darkMode = useSelector(DarkModeSelector);

    return (
        <header>
            <div className={cx('container', className)}>
                <div className={cx('row')}>
                    <h1 className={cx('logo')}>
                        <Link to={routes.home}>
                            {darkMode ? (
                                <img
                                    style={{
                                        width: '16.2rem',
                                        height: '3.2rem',
                                        objectFit: 'cover',
                                        marginLeft: '-15px',
                                    }}
                                    src="https://download.logo.wine/logo/TikTok/TikTok-Logomark%26Wordmark-White-Logo.wine.png"
                                    alt="logo Tiktok"
                                />
                            ) : (
                                <LogoTiktok />
                            )}
                        </Link>
                    </h1>
                    <FormSearch />
                    {user.login === null ? (
                        <UnloginRightHeader />
                    ) : user.login === true ? (
                        <LoginRightHeader />
                    ) : (
                        <UnloginRightHeader />
                    )}
                </div>
            </div>
            {createPortal(<ModalSign />, document.body)}
        </header>
    );
};

export default Header;
