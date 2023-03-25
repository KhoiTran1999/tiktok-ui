import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFireStore from '../../../hooks/useFireStore';
import { CurrentRoomsSelector, UserChatListSelector } from '../../../redux/selector';
import AccountItem from './AccountItem/AccountItem';
import style from './ChatAccountList.module.scss';
import MessagesOfRoomSlice from '../ChatBox/BodyChatBox/MessagesOfRoomSlice';

const cx = classNames.bind(style);
const ChatAccountList = () => {
    const dispatch = useDispatch();
    const userChatList = useSelector(UserChatListSelector);
    const curRoom = useSelector(CurrentRoomsSelector);
    const messages = useFireStore('messages', '', 'createdAt', 'asc');

    useEffect(() => {
        dispatch(MessagesOfRoomSlice.actions.setMessages(messages));
    }, [messages]);

    return (
        <div className={cx('accountList')}>
            <ul>
                {curRoom.length > 0 ? (
                    <>
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
                    </>
                ) : (
                    <p className={cx('empty')}>No messages yet</p>
                )}
            </ul>
        </div>
    );
};

export default ChatAccountList;
