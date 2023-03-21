import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import useFireStore from '../../../hooks/useFireStore';
import { UserChatListSelector } from '../../../redux/selector';
import AccountItem from './AccountItem/AccountItem';
import style from './ChatAccountList.module.scss';

const cx = classNames.bind(style);
const ChatAccountList = () => {
    const userChatList = useSelector(UserChatListSelector);
    const messages = useFireStore('messages', '', 'createdAt', 'asc');

    return (
        <div className={cx('accountList')}>
            <ul>
                {userChatList.map((val) => (
                    <AccountItem
                        key={val.uid}
                        messages={messages}
                        uid={val.uid}
                        avatar={val.photoURL}
                        name={val.displayName}
                        user={val}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ChatAccountList;
