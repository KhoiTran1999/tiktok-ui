import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Button, ModalSign } from '../DetailComponent';
import AccountList from './AccountList/AccountList';
import Discover from './Discover/Discover';
import Footer from './Footer/Footer';
import NavMenu from './NavMenu/NavMenu';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);
const Sidebar = () => {
    const [isActiveLogin, setIsActiveLogin] = useState(false);

    const handleLogin = () => {
        setIsActiveLogin(true);
    };

    return (
        <>
            <div className={cx('fake-width')}></div>
            <aside className={cx('side-bar')}>
                <div className={cx('wrapper')}>
                    <NavMenu />
                </div>

                <div className={cx('wrapper')}>
                    <p className={cx('signText')}>Log in to follow creators, like videos, and view comments.</p>
                    <Button className={cx('sign')} outline large onClick={handleLogin}>
                        Log in
                    </Button>
                </div>

                <div className={cx('wrapper')}>
                    <AccountList title={'Suggested accounts'} tippyVisible={true} />
                </div>

                {/* <div className={cx('wrapper')}>
                    <AccountList title={'Following accounts'} />
                </div> */}

                <div className={cx('wrapper')}>
                    <Discover />
                </div>

                <Footer />
            </aside>
            <ModalSign isActiveLogin={isActiveLogin} setIsActiveLogin={setIsActiveLogin} />
        </>
    );
};

export default Sidebar;
