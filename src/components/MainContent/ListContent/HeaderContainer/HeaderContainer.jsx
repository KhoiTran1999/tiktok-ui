import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderContainer.module.scss';
import { Button } from '../../../ReusedComponent';
import { useDispatch, useSelector } from 'react-redux';
import ModalSignSlice from '../../../ReusedComponent/ModalSign/ModalSignSlice';
import { UserListSelector, UserSelector } from '../../../../redux/selector';
import { Link } from 'react-router-dom';
import { updateDocument } from '../../../../firebase/services';

const cx = classNames.bind(style);
const HeaderContainer = ({ userVideo, video }) => {
    const dispatch = useDispatch();
    const user = useSelector(UserSelector);
    const userList = useSelector(UserListSelector);

    const handleFollow = () => {
        if (user.followers.includes(video.uid)) {
            const newFollowers = user.followers.filter((val) => val !== video.uid);
            updateDocument('userList', user.id, {
                ...user,
                followers: newFollowers,
            });
        } else {
            updateDocument('userList', user.id, {
                ...user,
                followers: [...user.followers, video.uid],
            });
        }
    };
    console.log(user.followers);
    return (
        <div className={cx('header-container')}>
            <div className={cx('info-container')}>
                <Link to={`/profile/${userVideo.nickName}`}>
                    <span className={cx('wrap')}>
                        <span className={cx('nickname')}>{userVideo.nickName}</span>
                        <span className={cx('name')}>{userVideo.displayName}</span>
                    </span>
                </Link>
                <p className={cx('status')}>
                    {video.caption}
                    {/* <b className={cx('hash-tag')}>#story #tamtrang # duongthaithuyy</b> */}
                </p>
                <span className={cx('music')}>
                    {/* <i className="fa-solid fa-music"></i> Flop nhất link nhạc - Hayato_shiro */}
                </span>
            </div>

            {user.login === false ? (
                <Button outline small onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}>
                    Follow
                </Button>
            ) : user.followers.includes(video.uid) ? (
                <Button style={{ padding: '4px 16px' }} basic small onClick={handleFollow}>
                    Following
                </Button>
            ) : user.uid !== video.uid ? (
                <Button outline small onClick={handleFollow}>
                    Follow
                </Button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default HeaderContainer;
