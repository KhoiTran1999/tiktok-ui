import classNames from 'classnames/bind';
import React from 'react';
import Header from '../../components/Header/Header';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from './ProfileLayout.module.scss';
import { useSelector } from 'react-redux';
import { AllUserListSelector } from '../../redux/selector';
import NotFound from '../../components/NotFound/NotFound';

const cx = classNames.bind(style);
const ProfileLayout = () => {
    const allUserList = useSelector(AllUserListSelector);
    return (
        <>
            {allUserList.some((val) => window.location.pathname.endsWith(encodeURI(val.nickName))) ? (
                <div>
                    <div className={cx('container')}>
                        <Header className={cx('profile-container-header')} />
                        <div className={cx('row')}>
                            <Sidebar className={cx('profile-side-bar')} />
                            <ProfileContent />
                        </div>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default ProfileLayout;
