import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './GuestChatItem.module.scss';
import images from '../../../../../assets/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { deleteDocument, updateDocument } from '../../../../../firebase/services';
import ChoosedUserSlice from '../../../ChatAccountList/AccountItem/choosedUserSlice';
import SelectedRoomSlice from '../../../ChatAccountList/AccountItem/selectedRoomSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(style);
const GuestChatItem = ({ photoURL, guestUid, userUid, text, docId, userLoginPhotoURL, activeHeart }) => {
    const dispatch = useDispatch();

    const [isGuestHeartState, setIsGuestHeartState] = useState(() => {
        return activeHeart.includes(guestUid);
    });
    const [isUserHeartState, setIsUserHeartState] = useState(() => {
        return activeHeart.includes(userUid);
    });

    const handleDeleteDoc = () => {
        alert('You are only unable to delete your messages...!!!');
    };

    const handleInteractive = () => {
        setIsUserHeartState(!isUserHeartState);
    };

    useEffect(() => {
        setIsUserHeartState(activeHeart.includes(userUid));
        setIsGuestHeartState(activeHeart.includes(guestUid));
    }, [activeHeart]);

    useEffect(() => {
        if (isUserHeartState) {
            activeHeart.push(userUid);
            updateDocument('messages', docId, { activeHeart }).then((res) => {
                if (res === true) {
                    dispatch(ChoosedUserSlice.actions.setChoosedUser(''));
                    dispatch(SelectedRoomSlice.actions.setSelectedRoom(''));
                }
            });
        } else {
            activeHeart = activeHeart.filter((val) => val !== userUid);
            updateDocument('messages', docId, { activeHeart }).then((res) => {
                if (res === true) {
                    dispatch(ChoosedUserSlice.actions.setChoosedUser(''));
                    dispatch(SelectedRoomSlice.actions.setSelectedRoom(''));
                }
            });
        }
    }, [isUserHeartState]);

    return (
        <li className={cx('guestChatItem')}>
            <div className={cx('wrapper')}>
                <div className={cx('avatar')}>
                    <img src={photoURL} alt="avatar" />
                </div>
                <div className={cx('message')}>
                    <p>{text}</p>
                </div>

                <Tippy
                    delay={[0, 500]}
                    interactive
                    content={
                        <ul style={{ display: 'flex', padding: '7px', fontSize: '12px' }} className={cx('more')}>
                            <li onClick={handleInteractive} style={{ cursor: 'pointer' }}>
                                {isUserHeartState ? <span>Unlike</span> : <span>Like</span>}
                            </li>
                            <li onClick={handleDeleteDoc} style={{ margin: '0px 10px', cursor: 'pointer' }}>
                                <span>Delete</span>
                            </li>
                            <li style={{ cursor: 'pointer' }}>
                                <span>Report</span>
                            </li>
                        </ul>
                    }
                >
                    <div className={cx('iconMore')}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </Tippy>
            </div>
            <div
                className={cx('interactive', {
                    active: isUserHeartState || isGuestHeartState,
                })}
            >
                <i className="fa-solid fa-heart"></i>
                <img className={cx({ active: isUserHeartState })} src={userLoginPhotoURL} alt="" />
                <img className={cx({ active: isGuestHeartState })} src={photoURL} alt="" />
            </div>
        </li>
    );
};

export default GuestChatItem;
