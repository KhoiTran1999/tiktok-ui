import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import getUser from '../../../services/searchService';
import TippyAccountItem from '../TippyAccountItem';
import { AccountSearch } from '../../DetailComponent';
import style from './AccountList.module.scss';

const cx = classNames.bind(style);
const AccountList = ({ title, tippyVisible }) => {
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
                {tippyVisible ? <TippyAccountItem data={accountList} /> : <AccountSearch data={accountList} />}
                <button className={cx('see-all')}>See all</button>
            </div>
        </div>
    );
};

export default AccountList;
