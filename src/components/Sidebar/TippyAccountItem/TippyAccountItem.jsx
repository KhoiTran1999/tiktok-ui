import classNames from 'classnames/bind';
import React from 'react';

import { useSelector } from 'react-redux';
import { UserSelector } from '../../../redux/selector';
import AccountItem from './AccountItem';
import style from './TippyAccountItem.module.scss';

const cx = classNames.bind(style);
const TippyAccountItem = ({ accountList }) => {
    const user = useSelector(UserSelector);

    return (
        <div className={cx('Account-list-sidebar')}>
            <ul>
                {accountList ? (
                    <>
                        {accountList.map((val) => {
                            if (val.uid === user.uid || val.nickName === '') return <></>;

                            return <AccountItem key={val.id} accountUser={val} />;
                        })}
                    </>
                ) : (
                    <></>
                )}
            </ul>
        </div>
    );
};

export default TippyAccountItem;
