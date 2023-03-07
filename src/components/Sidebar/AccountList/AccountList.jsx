import React from 'react';
import style from './AccountList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const AccountList = () => {
    return (
        <div className={cx('account-list')}>
            <p>AccountList</p>
        </div>
    );
};

export default AccountList;
