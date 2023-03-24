import React from 'react';
import classNames from 'classnames/bind';
import style from './ProfileContent.module.scss';
import MoreAction from './MoreActionProfile/MoreActionProfile';
import InforProfile from './InforProfile/InforProfile';
import VideoProfile from './VideoProfile/VideoProfile';

const cx = classNames.bind(style);
const ProfileContent = () => {
    return (
        <div className={cx('profileContent')}>
            <div className={cx('header')}>
                <div className={cx('row')}>
                    <InforProfile />
                    <MoreAction />
                </div>
            </div>
            <VideoProfile />
        </div>
    );
};

export default ProfileContent;
