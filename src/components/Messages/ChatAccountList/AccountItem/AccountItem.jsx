import React from 'react';
import classNames from 'classnames/bind';
import style from './AccountItem.module.scss';
import images from '../../../../assets/images';
import { useDispatch } from 'react-redux';
import ChoosedUserSlice from '../../ChatBox/choosedUserSlice';

const cx = classNames.bind(style);
const AccountItem = ({ avatar, name, user }) => {
    const dispatch = useDispatch();
    const handleClickAccount = () => {
        dispatch(ChoosedUserSlice.actions.setChoosedUser(user));
    };
    return (
        <li className={cx('accountItem')} onClick={handleClickAccount}>
            <div className={cx('avatar')}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={cx('infor')}>
                <h4>{name}</h4>
                <div className={cx('wrapper')}>
                    <span className={cx('content')}>em dạo này ổn không, còn đi làm ở công ty cũ</span>
                    <span className={cx('createdAt')}>9:57 AM</span>
                </div>
            </div>
        </li>
    );
};

export default AccountItem;
