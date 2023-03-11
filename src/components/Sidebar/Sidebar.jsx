import classNames from 'classnames/bind';
import React from 'react';
import AccountList from './AccountList/AccountList';
import Discover from './Discover/Discover';
import Footer from './Footer/Footer';
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
                <AccountList title={'Suggested accounts'} tippyVisible={true} />
            </div>

            <div className={cx('wrapper')}>
                <AccountList title={'Following accounts'} />
            </div>

            <div className={cx('wrapper')}>
                <Discover />
            </div>

            <Footer />
        </aside>
    );
};

export default Sidebar;
