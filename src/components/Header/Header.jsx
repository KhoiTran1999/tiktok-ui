import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LogoTiktok from '../../assets/icon/LogoTiktok';
import routes from '../../config/routes.js';
import '../../translation/i18n.js';
import FormSearch from './FormSearch';
import style from './Header.module.scss';
import LoginRightHeader from './RightHeader/LoginRightHeader.jsx';
import UnloginRightHeader from './RightHeader/UnloginRightHeader.jsx';

const cx = classNames.bind(style);

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <header>
            <div className="container">
                <div className={cx('row')}>
                    <h1 className={cx('logo')}>
                        <Link to={routes.home}>
                            <LogoTiktok />
                        </Link>
                    </h1>
                    <FormSearch />
                    {isLogin ? <LoginRightHeader /> : <UnloginRightHeader />}
                </div>
            </div>
        </header>
    );
};

export default Header;
