import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../redux/selector';
import { AccountSearch } from '../../ReusedComponent';
import TippyAccountItem from '../TippyAccountItem';
import style from './AccountList.module.scss';

const cx = classNames.bind(style);
const AccountList = ({ title, tippyVisible, accountList }) => {
    const user = useSelector(UserSelector);
    const [newAccountList, setNewAccountList] = useState([]);
    const amountAccountRef = useRef(5);

    useEffect(() => {
        if (accountList) {
            const newArray = accountList.reduce((acc, val) => {
                if (acc.length < amountAccountRef.current) {
                    return [...acc, val];
                }
                return acc;
            }, []);
            setNewAccountList(newArray);
        }
    }, [amountAccountRef.current, accountList]);

    const handlePaginateAccountIncrease = () => {
        amountAccountRef.current += 5;
        setNewAccountList((prev) => [...prev]);
    };
    const handlePaginateAccountDecrease = () => {
        if (amountAccountRef.current >= 10) {
            amountAccountRef.current = 5;
            setNewAccountList((prev) => [...prev]);
        }
    };

    return (
        <div className={cx('account-list')}>
            <div className={cx('suggested-accounts')}>
                <p className={cx('title')}>{title}</p>
                {tippyVisible ? (
                    <TippyAccountItem accountList={newAccountList} />
                ) : (
                    <AccountSearch accountList={newAccountList} />
                )}
                {amountAccountRef.current >= 30 ? (
                    <button
                        onClick={handlePaginateAccountDecrease}
                        className={cx('see-all', {
                            skeletonLoading: user.login === null,
                        })}
                    >
                        See less
                    </button>
                ) : (
                    <button
                        onClick={handlePaginateAccountIncrease}
                        className={cx('see-all', {
                            skeletonLoading: user.login === null,
                        })}
                    >
                        See all
                    </button>
                )}
            </div>
        </div>
    );
};

export default AccountList;
