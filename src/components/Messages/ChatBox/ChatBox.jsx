import classNames from 'classnames/bind';
import React from 'react';
import BodyChatBox from './BodyChatBox/BodyChatBox';
import style from './ChatBox.module.scss';
import FooterChatBox from './FooterChatBox/FooterChatBox';
import HeaderChatBox from './HeaderChatBox/HeaderChatBox';

const cx = classNames.bind(style);
const ChatBox = () => {
    return (
        <div className={cx('chatBox')}>
            <HeaderChatBox />
            <BodyChatBox />
            <FooterChatBox />
        </div>
    );
};

export default ChatBox;
