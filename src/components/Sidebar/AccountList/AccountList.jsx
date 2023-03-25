import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { AllUserListSelector, UserListSelector, UserSelector } from '../../../redux/selector';
import { AccountSearch } from '../../DetailComponent';
import TippyAccountItem from '../TippyAccountItem';
import style from './AccountList.module.scss';

const cx = classNames.bind(style);
const AccountList = ({ title, tippyVisible }) => {
    const user = useSelector(UserSelector);
    const allUserList = useSelector(AllUserListSelector);

    return (
        <div className={cx('account-list')}>
            <div className={cx('suggested-accounts')}>
                <p className={cx('title')}>{title}</p>
                {tippyVisible ? (
                    <TippyAccountItem allUserList={allUserList} />
                ) : (
                    <AccountSearch allUserList={allUserList} />
                )}
                <button
                    className={cx('see-all', {
                        skeletonLoading: user.login === null,
                    })}
                >
                    See all
                </button>
            </div>
        </div>
    );
};

export default AccountList;
