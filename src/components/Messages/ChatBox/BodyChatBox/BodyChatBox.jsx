import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import style from './BodyChatBox.module.scss';
import GuestChatItem from './GuestChatItem/GuestChatItem';
import UserChatItem from './UserChatItem/UserChatItem';

const cx = classNames.bind(style);
const BodyChatBox = () => {
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, []);
    return (
        <div className={cx('bodyChatBox')}>
            <ul>
                <GuestChatItem />
                <UserChatItem />
                <UserChatItem />
                <UserChatItem />
                <GuestChatItem />
                <GuestChatItem />
                <UserChatItem />
                <UserChatItem />
                <UserChatItem />
                <GuestChatItem />
                <GuestChatItem />
                <UserChatItem />
                <UserChatItem />
                <UserChatItem />
                <GuestChatItem />
                <GuestChatItem />
                <UserChatItem />
                <UserChatItem />
                <UserChatItem />
                <GuestChatItem />
                <GuestChatItem />
                <UserChatItem />
                <UserChatItem />
                <UserChatItem />
                <GuestChatItem />
                <GuestChatItem />
                <UserChatItem />
                <UserChatItem />
                <UserChatItem />
                <GuestChatItem />
                <div ref={scrollRef}></div>
            </ul>
        </div>
    );
};

export default BodyChatBox;
