import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, ImageCustom } from '../../DetailComponent';
import ChoosedUserSlice from '../../Messages/ChatAccountList/AccountItem/choosedUserSlice';
import style from './InforProfile.module.scss';

const cx = classNames.bind(style);
const InforProfile = ({ allUserList }) => {
    const dispatch = useDispatch();
    const linkName = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        allUserList.map((val) => {
            if (val.nickName === linkName.userName) {
                setUser(val);
            }
        });
    });

    return (
        <div className={cx('infor')}>
            <div className={cx('header-infor')}>
                <div className={cx('avatar')}>
                    <img src={user.photoURL} />
                </div>
                <div className={cx('left-headerInfor')}>
                    <div className={cx('wrapper')}>
                        <h2 className={cx('nickName')}>{user.nickName}</h2>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h1 className={cx('displayName')}>{user.displayName}</h1>
                    <Button primary large className={cx('followButton')}>
                        Follow
                    </Button>
                </div>
            </div>
            <div className={cx('footer-infor')}>
                <p className={cx('status')}>
                    <b>{user.followingsCount}</b> Followings <b>{user.followersCount}</b> Followers{' '}
                    <b>{user.likesCount}</b> Likes
                </p>
                <p className={cx('bio')}>{user.bio}</p>
                <div className={cx('websiteURL')}>
                    <i className="fa-solid fa-link"></i>
                    <a href={user.websiteURL} target="_blank">
                        {user.websiteURL}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InforProfile;
