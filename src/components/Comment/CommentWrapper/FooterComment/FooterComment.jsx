import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Tippy from '@tippyjs/react/headless';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import style from './FooterComment.module.scss';
import firebase from '../../../../firebase/config';
import { updateDocument } from '../../../../firebase/services';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../../../../redux/selector';
import { ModalSign } from '../../../ReusedComponent';
import ModalSignSlice from '../../../ReusedComponent/ModalSign/ModalSignSlice';

const cx = classNames.bind(style);
const FooterComment = ({ video }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [isCount, setIsCount] = useState(false);

    const userLogin = useSelector(UserSelector);

    const formRef = useRef();
    const textAreaRef = useRef();

    const handleOnChange = (e) => {
        if (inputValue.length === 0 && e.target.value === ' ') return;
        setInputValue(e.target.value);

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
        if (inputValue.trim().length === 0) return;
        if (video.uid === userLogin.uid) {
            updateDocument('videoList', video.id, {
                comments: [
                    ...video.comments,
                    {
                        photoURL: userLogin.photoURL,
                        nickName: userLogin.displayName,
                        uid: userLogin.uid,
                        id: uuidv4(),
                        text: inputValue,
                        likes: [],
                        replyComment: [],
                        notification: false,
                        createdAt: firebase.firestore.Timestamp.now(),
                    },
                ],
            });
        } else {
            updateDocument('videoList', video.id, {
                comments: [
                    ...video.comments,
                    {
                        photoURL: userLogin.photoURL,
                        nickName: userLogin.displayName,
                        uid: userLogin.uid,
                        id: uuidv4(),
                        text: inputValue,
                        likes: [],
                        replyComment: [],
                        notification: true,
                        createdAt: firebase.firestore.Timestamp.now(),
                    },
                ],
            });
        }

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
                    {userLogin.login ? (
                        <>
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
                        </>
                    ) : (
                        <p
                            className={cx('loginToComment')}
                            onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}
                        >
                            Log in to comment
                        </p>
                    )}
                </form>
                <span onClick={handleSubmit} className={cx({ active: inputValue.length > 0 })}>
                    Post
                </span>
            </div>
            {createPortal(<ModalSign />, document.body)}
        </div>
    );
};

export default FooterComment;
