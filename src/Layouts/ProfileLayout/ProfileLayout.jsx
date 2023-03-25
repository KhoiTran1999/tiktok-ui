import classNames from 'classnames/bind';
import React from 'react';
import Header from '../../components/Header/Header';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from './ProfileLayout.module.scss';

const cx = classNames.bind(style);
const ProfileLayout = () => {
    return (
        <div>
            <div className={cx('container')}>
                <Header className={cx('profile-container-header')} />
                <div className={cx('row')}>
                    <Sidebar className={cx('profile-side-bar')} />
                    <ProfileContent />
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;