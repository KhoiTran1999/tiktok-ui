import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { addDocument } from '../../../../firebase/services';
import { ChoosedUserSelector, SelectedRoomSelector, UserSelector } from '../../../../redux/selector';
import style from './FooterChatBox.module.scss';
import LogoMessageActive from '../../../../assets/icon/LogoMessageActive';

const cx = classNames.bind(style);
const FooterChatBox = () => {
    const [inputValue, setInputValue] = useState('');
    const user = useSelector(UserSelector);
    const selectedRoom = useSelector(SelectedRoomSelector);

    useEffect(() => {
        let textarea = document.getElementById('myTextarea');
        if (inputValue.length === 0) textarea.rows = 1;
    }, [inputValue]);

    const handleSubmit = (e) => {
        if (inputValue.trim().length === 0) return;
        addDocument('messages', {
            uid: user.uid,
            text: inputValue,
            roomId: selectedRoom,
            createdAt: new Date(),
            photoURL: user.photoURL,
            activeHeart: [],
        });
        setInputValue('');
    };

    const handleInput = (e) => {
        if (inputValue.length === 0 && e.target.value === ' ') return;
        setInputValue(e.target.value);
    };

    const handleEmojiSelect = (emoji) => {
        setInputValue(inputValue + emoji.native);
    };

    const handleFocus = () => {
        const form = document.querySelector('form');
        form.style.border = '1px solid rgba(22, 24, 35, 0.2)';
    };
    const handleUnfocus = () => {
        const form = document.querySelector('form');
        form.style.border = '1px solid transparent';
    };

    function autoSizeTextArea(e, defaultHeight) {
        const form = document.querySelector('form');
        const textarea = document.getElementById('myTextarea');
        const overflow = document.getElementById(`${cx('overflow')}`);

        textarea.style.height = `auto`;
        const height = e.target.scrollHeight;
        textarea.style.height = `${height}px`;

        if (defaultHeight) {
            textarea.style.height = `16px`;
            form.style.paddingBottom = '5px';
            overflow.classList.remove(`${cx('active')}`);
            return;
        }
        if (e.target.scrollHeight > 16) {
            form.style.paddingBottom = '30px';
            overflow.classList.add(`${cx('active')}`);
        } else {
            form.style.paddingBottom = '5px';
            overflow.classList.remove(`${cx('active')}`);
        }
    }

    const pressed = (e) => {
        if (e.which == 13 && !e.shiftKey) {
            autoSizeTextArea(e, true);
            e.preventDefault(e);
            handleSubmit();
        }
    };

    return (
        <div className={cx('footerChatBox')}>
            <form action="message" onSubmit={handleSubmit}>
                <textarea
                    name="messages"
                    id="myTextarea"
                    onInput={autoSizeTextArea}
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={pressed}
                    onFocus={handleFocus}
                    onBlur={handleUnfocus}
                    autoFocus
                    type="text"
                    placeholder="Send a message..."
                    cols="80"
                    maxLength={6000}
                ></textarea>
                <span id={cx('overflow')}>{inputValue.length}/6000</span>
            </form>
            <Tippy
                interactive
                trigger="click"
                placement="top-end"
                render={(attrs) => (
                    <Picker
                        emojiTooltip={true}
                        onEmojiSelect={handleEmojiSelect}
                        perLine="7"
                        navPosition="none"
                        emojiButtonSize="40"
                        emojiButtonRadius="5px"
                        emojiButtonColors={['rgb(241, 241, 241)']}
                        categories={['people']}
                        icon="auto"
                        maxFrequentRows="0"
                        noCountryFlags={false}
                        theme="light"
                        searchPosition="none"
                        previewPosition="none"
                        data={data}
                    />
                )}
            >
                <div
                    className={cx('icon', {
                        active: inputValue.length > 0,
                    })}
                >
                    <i className="fa-regular fa-face-smile"></i>
                </div>
            </Tippy>
            <div
                onClick={handleSubmit}
                className={cx('sentButton', {
                    active: inputValue.length > 0,
                })}
            >
                <LogoMessageActive />
            </div>
        </div>
    );
};

export default FooterChatBox;
