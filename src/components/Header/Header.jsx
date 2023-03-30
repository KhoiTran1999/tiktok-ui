import classNames from 'classnames/bind';
import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoTiktok from '../../assets/icon/LogoTiktok';
import routes from '../../config/routes.js';
import { UserSelector } from '../../redux/selector';
import '../../translation/i18n.js';
import { ModalSign } from '../ReusedComponent';
import FormSearch from './FormSearch/FormSearch';
import style from './Header.module.scss';
import LoginRightHeader from './RightHeader/LoginRightHeader.jsx';
import UnloginRightHeader from './RightHeader/UnloginRightHeader.jsx';

const cx = classNames.bind(style);

const Header = ({ className }) => {
    const user = useSelector(UserSelector);

    return (
        <header>
            <div className={cx('container', className)}>
                <div className={cx('row')}>
                    <h1 className={cx('logo')}>
                        <Link to={routes.home}>
                            <LogoTiktok />
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
