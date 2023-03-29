import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderContainer.module.scss';
import { Button } from '../../../DetailComponent';
import { useDispatch, useSelector } from 'react-redux';
import ModalSignSlice from '../../../DetailComponent/ModalSign/ModalSignSlice';
import { UserSelector } from '../../../../redux/selector';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
const HeaderContainer = ({ userVideo, video }) => {
    const dispatch = useDispatch();
    const user = useSelector(UserSelector);

    const handleSign = () => {
        if (user.login === false) dispatch(ModalSignSlice.actions.setModalSign(true));
    };
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
                    {video.caption} <b className={cx('hash-tag')}>#story #tamtrang # duongthaithuyy</b>
                </p>
                <span className={cx('music')}>
                    <i className="fa-solid fa-music"></i> Flop nhất link nhạc - Hayato_shiro
                </span>
            </div>
            <Button outline small onClick={handleSign}>
                Follow
            </Button>
        </div>
    );
};

export default HeaderContainer;
