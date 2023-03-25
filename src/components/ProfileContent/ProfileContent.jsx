import React from 'react';
import classNames from 'classnames/bind';
import style from './ProfileContent.module.scss';
import MoreAction from './MoreActionProfile/MoreActionProfile';
import InforProfile from './InforProfile/InforProfile';
import VideoProfile from './VideoProfile/VideoProfile';
import { useSelector } from 'react-redux';
import { AllUserListSelector } from '../../redux/selector';

const cx = classNames.bind(style);
const ProfileContent = () => {
    const allUserList = useSelector(AllUserListSelector);

    return (
        <div className={cx('profileContent')}>
            <div className={cx('header')}>
                <div className={cx('row')}>
                    <InforProfile allUserList={allUserList} />
                    <MoreAction allUserList={allUserList} />
                </div>
            </div>
            <VideoProfile />
        </div>
    );
};

export default ProfileContent;
