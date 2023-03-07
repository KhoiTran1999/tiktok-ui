import classNames from 'classnames/bind';
import React from 'react';
import NavMenu from './NavMenu/NavMenu';

import style from './Sidebar.module.scss';

const cx = classNames.bind(style);
const Sidebar = () => {
    return (
        <div className={cx('side-bar')}>
            <NavMenu />
        </div>
    );
};

export default Sidebar;
