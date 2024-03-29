import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChoosedUserSelector } from '../../../../redux/selector';
import style from './HeaderChatBox.module.scss';

const cx = classNames.bind(style);
const HeaderChatBox = () => {
    const choosedUser = useSelector(ChoosedUserSelector);

    return (
        <div className={cx('header')}>
            <Link to={`/profile/${choosedUser.nickName}`}>
                <div className={cx('avatar')}>
                    <img src={choosedUser.photoURL} alt="avatar" />
                </div>
                <div className={cx('infor')}>
                    <h4>{choosedUser.displayName}</h4>
                    <span>{choosedUser.displayName}</span>
                </div>
            </Link>
        </div>
    );
};

export default HeaderChatBox;
