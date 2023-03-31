import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import classNames from 'classnames/bind';
import style from './FooterComment.module.scss';

const cx = classNames.bind(style);
const FooterComment = () => {
    const [inputValue, setInputValue] = useState('');
    const [isCount, setIsCount] = useState(false);

    const formRef = useRef();
    const textAreaRef = useRef();

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
        const form = document.querySelector('form');

        textAreaRef.current.style = 'height: auto';
        const height = e.target.scrollHeight;
        textAreaRef.current.style = `height: ${height}px`;

        if (height > 17) {
            setIsCount(true);
            formRef.current.style.padding = '10px 90px 40px 9px';
        } else {
            setIsCount(false);
            formRef.current.style.padding = '10px 90px 8px 9px';
        }
    };

    const handleSubmit = () => {
        //Reset
        setInputValue('');
        textAreaRef.current.style = 'height: auto';
        setIsCount(false);
        formRef.current.style.padding = '10px 90px 8px 9px';
    };

    const pressed = (e) => {
        if (e.which == 13 && !e.shiftKey) {
            e.preventDefault(e);
            handleSubmit();
        }
    };

    const handleEmojiSelect = (emoji) => {
        setInputValue(inputValue + emoji.native);
    };

    return (
        <div className={cx('footerComment')}>
            <div className={cx('form-group')}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <textarea
                        onInput={handleOnChange}
                        onFocus={() => (formRef.current.style.border = '1px solid rgba(22, 24, 35, 0.2)')}
                        onBlur={() => (formRef.current.style.border = '1px solid transparent)')}
                        onKeyDown={pressed}
                        value={inputValue}
                        ref={textAreaRef}
                        className={cx('textArea')}
                        placeholder={'Add comment...'}
                        maxLength={150}
                        autoFocus
                        rows={1}
                    ></textarea>
                    <span
                        className={cx('counting', {
                            active: isCount,
                            fullWord: inputValue.length === 150,
                        })}
                    >
                        {inputValue.length}/150
                    </span>

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
                        <i className="fa-regular fa-face-smile"></i>
                    </Tippy>
                </form>
                <span onClick={handleSubmit} className={cx({ active: inputValue.length > 0 })}>
                    Post
                </span>
            </div>
        </div>
    );
};

export default FooterComment;
