import React, { useEffect } from 'react';
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
import { AllUserListSelector, UserListSelector, UserSelector } from '../../../../redux/selector';
import { ModalSign } from '../../../ReusedComponent';
import ModalSignSlice from '../../../ReusedComponent/ModalSign/ModalSignSlice';
import { Timestamp } from 'firebase/firestore';
import Mentions from '../../../ReusedComponent/Metions/Mentions';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const FooterComment = ({ video, inputValue, setInputValue, listMention, setListMention, textAreaRef }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isCount, setIsCount] = useState(false);

    const userLogin = useSelector(UserSelector);
    const userList = useSelector(UserListSelector);

    const formRef = useRef();

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
                    notification: video.uid === userLogin.uid ? false : true,
                    createdAt: Timestamp.fromDate(new Date()),
                },
            ],
        });

        //add notification box for user who uploaded video
        userList.map((user) => {
            if (user.uid === video.uid && userLogin.uid !== video.uid) {
                const newCommentNoti = {
                    nickName: userLogin.nickName,
                    photoURL: userLogin.photoURL,
                    thumbnail: video.thumbnail,
                    text: inputValue,
                    createdAt: Timestamp.fromDate(new Date()),
                };
                updateDocument('userList', user.id, {
                    notification: {
                        ...user.notification,
                        status: true,
                        comments: [newCommentNoti, ...user.notification.comments],
                    },
                });
            }
        });

        //add user mention to notification box
        listMention.map((user) => {
            const newMention = [
                ...user.notification.mentions,
                {
                    nickName: userLogin.nickName,
                    photoURL: userLogin.photoURL,
                    text: inputValue,
                    thumbnail: video.thumbnail,
                    createdAt: Timestamp.fromDate(new Date()),
                    taggedPlace: 'comment',
                },
            ];
            updateDocument('userList', user.id, {
                notification: {
                    ...user.notification,
                    status: true,
                    mentions: newMention,
                },
            });
        });

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

    //get user who is mentioned from Mention Component
    const getSelectedUser = (selectedUser) => {
        textAreaRef.current.focus();
        setListMention([...listMention, selectedUser]);
    };

    useEffect(() => {
        const newListMention = listMention.filter((val) => inputValue.includes(`"${val.nickName}"`));
        setListMention(newListMention);
    }, [inputValue]);
    //-----------------------------------------------------

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
                                placeholder={`${t('comment.Add comment')}...`}
                                maxLength={150}
                                rows={1}
                            ></textarea>
                            <Mentions
                                data={userList}
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                getSelectedUser={getSelectedUser}
                                positionBottom={'0px'}
                                positionLeft={'-1px'}
                                limit={150}
                            />
                            <span
                                className={cx('counting', {
                                    active: isCount,
                                    fullWord: inputValue.length === 150,
                                })}
                            >
                                {inputValue.length}/150
                            </span>

                            <span
                                className={cx('name-tagging')}
                                onClick={() => {
                                    if (inputValue.length < 150) {
                                        setInputValue(inputValue + '@');
                                    }
                                }}
                            >
                                @
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
                            {t('comment.Log in to comment')}
                        </p>
                    )}
                </form>
                <span onClick={handleSubmit} className={cx({ active: inputValue.length > 0 })}>
                    {t('upload.Post')}
                </span>
            </div>
            {createPortal(<ModalSign />, document.body)}
        </div>
    );
};

export default FooterComment;
