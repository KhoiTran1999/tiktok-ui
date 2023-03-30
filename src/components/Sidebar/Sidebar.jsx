import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../../redux/selector';
import { Button } from '../ReusedComponent';
import ModalSignSlice from '../ReusedComponent/ModalSign/ModalSignSlice';
import AccountList from './AccountList/AccountList';
import Discover from './Discover/Discover';
import Footer from './Footer/Footer';
import NavMenu from './NavMenu/NavMenu';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);
const Sidebar = ({ className = 'side-bar' }) => {
    const dispatch = useDispatch();
    const user = useSelector(UserSelector);

    const handleLogin = () => {
        dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    return (
        <>
            <div className={cx('fake-width')}></div>
            <div className={cx('parents')}>
                <aside className={cx('side-bar', `${className}`)}>
                    <div className={cx('wrapper')}>
                        <NavMenu />
                    </div>

                    {user.login ? (
                        <>
                            <div className={cx('wrapper')}>
                                <AccountList title={'Suggested accounts'} tippyVisible={true} />
                            </div>
                            <div className={cx('wrapper')}>
                                <AccountList title={'Following accounts'} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('wrapper')}>
                                <p
                                    className={cx('signText', {
                                        skeletonLoading: user.login === null,
                                    })}
                                >
                                    Log in to follow creators, like videos, and view comments.
                                </p>
                                <Button
                                    className={cx('sign', {
                                        skeletonLoading: user.login === null,
                                    })}
                                    outline
                                    large
                                    onClick={handleLogin}
                                >
                                    Log in
                                </Button>
                            </div>
                            <div className={cx('wrapper')}>
                                <AccountList title={'Suggested accounts'} tippyVisible={true} />
                            </div>
                        </>
                    )}

                    <div className={cx('wrapper')}>
                        <Discover />
                    </div>

                    <Footer />
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
