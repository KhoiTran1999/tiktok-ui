import classNames from 'classnames/bind';
import React, { useState } from 'react';
import style from './FooterChatBox.module.scss';

const cx = classNames.bind(style);
const FooterChatBox = () => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div className={cx('footerChatBox')}>
            <input
                className={cx({
                    active: inputValue.length > 0,
                })}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                type="text"
                placeholder="Send a message..."
            />
            <div className={cx('icon')}>
                <i class="fa-regular fa-face-smile"></i>
            </div>
        </div>
    );
};

export default FooterChatBox;
