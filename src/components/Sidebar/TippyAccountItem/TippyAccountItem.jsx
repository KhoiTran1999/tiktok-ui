import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import ImageCustom from '../../ReusedComponent/ImageCustom';
import style from './TippyAccountItem.module.scss';
import SubnavWrapper from '../../ReusedComponent/SubnavWrapper';
import Button from '../../ReusedComponent/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../../../redux/selector';
import ModalSignSlice from '../../ReusedComponent/ModalSign/ModalSignSlice';
import { updateDocument } from '../../../firebase/services';
import AccountItem from './AccountItem';

const cx = classNames.bind(style);
const TippyAccountItem = ({ accountList }) => {
    const user = useSelector(UserSelector);

    return (
        <div className={cx('Account-list-sidebar')}>
            <ul>
                {accountList ? (
                    <>
                        {accountList.map((val) => {
                            if (val.uid === user.uid) return <></>;

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
