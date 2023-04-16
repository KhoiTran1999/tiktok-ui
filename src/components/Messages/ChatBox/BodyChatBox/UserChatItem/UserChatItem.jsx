import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './UserChatItem.module.scss';
import images from '../../../../../assets/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { updateDocument, deleteDocument } from '../../../../../firebase/services';
import { useDispatch } from 'react-redux';
import ChoosedUserSlice from '../../../ChatAccountList/AccountItem/choosedUserSlice';
import SelectedRoomSlice from '../../../ChatAccountList/AccountItem/selectedRoomSlice';

const cx = classNames.bind(style);
const UserChatItem = ({ photoURL, userUid, guestUid, text, docId, guestPhotoURL, activeHeart, createdAt }) => {
    const dispatch = useDispatch();

    const [isGuestHeartState, setIsGuestHeartState] = useState(() => {
        return activeHeart.includes(guestUid);
    });
    const [isUserHeartState, setIsUserHeartState] = useState(() => {
        return activeHeart.includes(userUid);
    });

    const handleDeleteDoc = () => {
        deleteDocument('messages', docId);
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
        <li className={cx('userChatItem')} title={createdAt}>
            <div className={cx('wrapper')}>
                <Tippy
                    delay={[0, 500]}
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
                    interactive
                >
                    <div className={cx('iconMore')}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </Tippy>
                <div className={cx('message')}>
                    <p>{text}</p>
                </div>
                <div className={cx('avatar')}>
                    <img src={photoURL} alt="avatar" />
                </div>
            </div>
            <div
                className={cx('interactive', {
                    active: isUserHeartState || isGuestHeartState,
                })}
            >
                <i className="fa-solid fa-heart"></i>
                <img className={cx({ active: isUserHeartState })} src={photoURL} alt="" />
                <img className={cx({ active: isGuestHeartState })} src={guestPhotoURL} alt="" />
            </div>
        </li>
    );
};

export default UserChatItem;
