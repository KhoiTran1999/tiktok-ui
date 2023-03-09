import React, { useState } from 'react';
import { useEffect } from 'react';
import style from './AccountList.module.scss';
import classNames from 'classnames/bind';
import getUser from '../../../services/searchService';
import AccountSearch from '../../DetailComponent/AccountSearch/AccountSearch';
import TippyAccountItem from '../TippyAccountItem';

const cx = classNames.bind(style);
const AccountList = ({ title }) => {
    const [accountList, setAccountList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await getUser('hoa');
            setAccountList(response.data);
        };
        getData();
    }, []);
    return (
        <div className={cx('account-list')}>
            <div className={cx('suggested-accounts')}>
                <p className={cx('title')}>{title}</p>
<<<<<<< HEAD
                <TippyAccountItem data={accountList} />
=======
                <AccountSearch data={accountList} />
                <button className={cx('see-all')}>See all</button>
>>>>>>> 6cc0c19312974473bc1d071c783ddd429180598a
            </div>
        </div>
    );
};

export default AccountList;
