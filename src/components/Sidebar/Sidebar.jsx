import classNames from 'classnames/bind';
import React from 'react';
import AccountList from './AccountList/AccountList';
import NavMenu from './NavMenu/NavMenu';

import style from './Sidebar.module.scss';

const cx = classNames.bind(style);
const Sidebar = () => {
    return (
        <aside className={cx('side-bar')}>
            <div className={cx('wrapper')}>
                <NavMenu />
            </div>

            <div className={cx('wrapper')}>
<<<<<<< HEAD
                <AccountList title={'Suggested Accounts'} />
=======
                <AccountList title={'Suggested accounts'} />
            </div>

            <div className={cx('wrapper')}>
                <AccountList title={'Following accounts'} />
>>>>>>> 6cc0c19312974473bc1d071c783ddd429180598a
            </div>
        </aside>
    );
};

export default Sidebar;
