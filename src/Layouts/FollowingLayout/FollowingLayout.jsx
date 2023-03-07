import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from './FollowingLayout.module.scss';
import classNames from 'classnames/bind';
import Following from '../../components/Following/Following';

const cx = classNames.bind(style);
const FollowingLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className={cx('row')}>
                        <Sidebar />
                        <Following />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FollowingLayout;
