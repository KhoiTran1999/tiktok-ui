import React, { useState } from 'react';
import { useEffect } from 'react';
import style from './AccountList.module.scss';
import classNames from 'classnames/bind';
import getUser from '../../../services/searchService';
import AccountSearch from '../../DetailComponent/AccountSearch/AccountSearch';

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
                <p>{title}</p>
                <AccountSearch data={accountList} />
            </div>
        </div>
    );
};

export default AccountList;
