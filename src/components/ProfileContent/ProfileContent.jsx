import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ProfileContent.module.scss';
import MoreActionProfile from './MoreActionProfile/MoreActionProfile';
import { createPortal } from 'react-dom';

import InforProfile from './InforProfile/InforProfile';
import VideoProfile from './VideoProfile/VideoProfile';
import { useSelector } from 'react-redux';
import { AllUserListSelector } from '../../redux/selector';
import ModalEditProfile from './ModalEditProfile/ModalEditProfile';

const cx = classNames.bind(style);
const ProfileContent = () => {
    const allUserList = useSelector(AllUserListSelector);

    return (
        <>
            <div className={cx('profileContent')}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('row')}>
                            <InforProfile allUserList={allUserList} />
                            <MoreActionProfile allUserList={allUserList} />
                        </div>
                    </div>
                    <VideoProfile allUserList={allUserList} />
                </div>
                {createPortal(<ModalEditProfile />, document.body)}
            </div>
        </>
    );
};

export default ProfileContent;
