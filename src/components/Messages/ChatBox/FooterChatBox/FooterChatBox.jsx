import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { addDocument } from '../../../../firebase/services';
import { ChoosedUserSelector, SelectedRoomSelector, UserSelector } from '../../../../redux/selector';
import style from './FooterChatBox.module.scss';
import LogoMessageActive from '../../../../assets/icon/LogoMessageActive';

const Box = styled(motion.div)``;
const cx = classNames.bind(style);
const FooterChatBox = () => {
    const [inputValue, setInputValue] = useState('');
    const user = useSelector(UserSelector);
    const selectedRoom = useSelector(SelectedRoomSelector);

    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
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

    //-----------Tippy Framer Motion------------------------
    const springConfig = { damping: 15, stiffness: 300 };
    const initialScale = 0.5;
    const opacity = useSpring(0, springConfig);
    const scale = useSpring(initialScale, springConfig);

    function onMount() {
        scale.set(1);
        opacity.set(1);
    }

    function onHide({ unmount }) {
        const cleanup = scale.onChange((value) => {
            if (value <= initialScale) {
                cleanup();
                unmount();
            }
        });
        scale.set(initialScale);
        opacity.set(0);
    }
    //------------------------------------------------------
    return (
        <div className={cx('footerChatBox')}>
            <form action="message" onSubmit={handleSubmit}>
                <input
                    className={cx({
                        active: inputValue.length > 0,
                    })}
                    value={inputValue}
                    onChange={handleInput}
                    autoFocus
                    type="text"
                    placeholder="Send a message..."
                />
            </form>

            <Tippy
                interactive
                trigger="click"
                placement="top-end"
                animation={true}
                onMount={onMount}
                onHide={onHide}
                render={(attrs) => (
                    <Box style={{ scale, opacity }} {...attrs}>
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
                    </Box>
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
