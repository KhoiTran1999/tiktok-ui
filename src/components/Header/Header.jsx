import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoTiktok from '../../assets/icon/LogoTiktok';
import routes from '../../config/routes.js';
import { getUserSelector } from '../../redux/selector';
import '../../translation/i18n.js';
import FormSearch from './FormSearch';
import style from './Header.module.scss';
import LoginRightHeader from './RightHeader/LoginRightHeader.jsx';
import UnloginRightHeader from './RightHeader/UnloginRightHeader.jsx';

const cx = classNames.bind(style);

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const user = useSelector(getUserSelector);
    useEffect(() => {
        if (user) setIsLogin(true);
        else setIsLogin(false);
    }, [user]);

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
