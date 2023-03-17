import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../DetailComponent';
import AccountList from './AccountList/AccountList';
import Discover from './Discover/Discover';
import Footer from './Footer/Footer';
import NavMenu from './NavMenu/NavMenu';
import style from './Sidebar.module.scss';
import ModalSignSlice from '../DetailComponent/ModalSign/ModalSignSlice';
import { getUserSelector } from '../../redux/selector';

const cx = classNames.bind(style);
const Sidebar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(getUserSelector);

    useEffect(() => {
        if (user) setIsLogin(true);
        else setIsLogin(false);
    }, [user]);

    const handleLogin = () => {
        dispatch(ModalSignSlice.actions.changeModalSign(true));
    };

    return (
        <>
            <div className={cx('fake-width')}></div>
            <aside className={cx('side-bar')}>
                <div className={cx('wrapper')}>
                    <NavMenu />
                </div>

                {isLogin ? (
                    <div className={cx('wrapper')}>
                        <AccountList title={'Following accounts'} />
                    </div>
                ) : (
                    <div className={cx('wrapper')}>
                        <p className={cx('signText')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button className={cx('sign')} outline large onClick={handleLogin}>
                            Log in
                        </Button>
                    </div>
                )}

                <div className={cx('wrapper')}>
                    <AccountList title={'Suggested accounts'} tippyVisible={true} />
                </div>

                <div className={cx('wrapper')}>
                    <Discover />
                </div>

                <Footer />
            </aside>
        </>
    );
};

export default Sidebar;
