import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addDocument } from '../../../../firebase/services';
import { ChoosedUserSelector, ClickedRoomSelector, UserSelector } from '../../../../redux/selector';
import style from './FooterChatBox.module.scss';

const cx = classNames.bind(style);
const FooterChatBox = () => {
    const [inputValue, setInputValue] = useState('');
    const [clickRoomId, setClickRoomID] = useState('');
    const user = useSelector(UserSelector);
    const clickRoom = useSelector(ClickedRoomSelector);
    const choosedUser = useSelector(ChoosedUserSelector);

    useEffect(() => {
        setClickRoomID(clickRoom.id);
    }, [choosedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument('messages', {
            uid: user.uid,
            text: inputValue,
            roomId: clickRoomId,
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

            <div className={cx('icon')}>
                <i className="fa-regular fa-face-smile"></i>
            </div>
        </div>
    );
};

export default FooterChatBox;
