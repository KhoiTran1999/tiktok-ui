import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(style);
const AccountSearch = () => {
    return (
        <div className={cx('Account')}>
            <img src={images.imgGaiXinh2} alt="avatar" />
            <div className={cx('information')}>
                <h4 className={cx('userName')}>datvilla94</h4>
                <span className={cx('name')}>ĐạtVilla</span>
            </div>
        </div>
    );
};

export default AccountSearch;
