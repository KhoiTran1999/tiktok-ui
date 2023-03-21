import classNames from 'classnames/bind';
import { formatRelative } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFireStore from '../../../../hooks/useFireStore';
import { ChoosedUserSelector, ClickedRoomSelector, LoadingSelector, UserSelector } from '../../../../redux/selector';
import style from './BodyChatBox.module.scss';
import GuestChatItem from './GuestChatItem/GuestChatItem';
import UserChatItem from './UserChatItem/UserChatItem';
import Skeleton from './Skeleton/Skeleton';

const cx = classNames.bind(style);
const BodyChatBox = () => {
    const dispatch = useDispatch();
    const loading = useSelector(LoadingSelector);
    const scrollRef = useRef(null);

    const userLogin = useSelector(UserSelector);
    const choosedUser = useSelector(ChoosedUserSelector);
    const clickRoom = useSelector(ClickedRoomSelector);

    const [clickRoomId, setClickRoomID] = useState('');

    useEffect(() => {
        setClickRoomID(clickRoom.id);
    }, [choosedUser]);

    // Get messages
    const messagesCondition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: clickRoomId,
        };
    }, [clickRoomId]);

    const messages = useFireStore('messages', messagesCondition, 'createdAt', 'asc');
    //-----------------------------------------------------
    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, [messages]);

    const formatDate = (seconds) => {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            formattedDate = formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
    };

    return (
        <div className={cx('bodyChatBox')}>
            <ul>
                <p className={cx('createdAtRoom')}>Created at {formatDate(clickRoom.createdAt.seconds)}</p>
                <>
                    {messages.map((val) => {
                        const { photoURL, text, id, activeHeart } = val;
                        return (
                            <>
                                {val.uid === userLogin.uid ? (
                                    <UserChatItem
                                        key={id}
                                        photoURL={photoURL}
                                        userUid={userLogin.uid}
                                        guestUid={choosedUser.uid}
                                        guestPhotoURL={choosedUser.photoURL}
                                        text={text}
                                        docId={id}
                                        activeHeart={activeHeart}
                                    />
                                ) : (
                                    <GuestChatItem
                                        key={id}
                                        photoURL={photoURL}
                                        guestUid={choosedUser.uid}
                                        userUid={userLogin.uid}
                                        userLoginPhotoURL={userLogin.photoURL}
                                        text={text}
                                        docId={id}
                                        activeHeart={activeHeart}
                                    />
                                )}
                            </>
                        );
                    })}
                </>

                <div ref={scrollRef}></div>
            </ul>
        </div>
    );
};

export default BodyChatBox;
