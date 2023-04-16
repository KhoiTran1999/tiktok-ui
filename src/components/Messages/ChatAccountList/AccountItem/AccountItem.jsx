import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

import { AmountOfNotiSelector, CurrentRoomsSelector, UserSelector } from '../../../../redux/selector';
import ChoosedUserSlice from './choosedUserSlice';
import style from './AccountItem.module.scss';
import { SubnavWrapper } from '../../../ReusedComponent';
import ToolList from './ToolList/ToolList';
import SelectedRoomSlice from './selectedRoomSlice';
import AmountOfNotiSlice from '../../../Header/RightHeader/AmountOfNotiSlice';
import { updateDocument } from '../../../../firebase/services';

const Box = styled(motion.div)``;
const cx = classNames.bind(style);
const AccountItem = ({ messages, uid, avatar, name, user }) => {
    const dispatch = useDispatch();

    const [roomId, setRoomId] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [text, setText] = useState('');
    const [isEmptyRoom, setIsEmptyRoom] = useState(false);

    const userLogin = useSelector(UserSelector);
    const rooms = useSelector(CurrentRoomsSelector);
    const amountNoti = useSelector(AmountOfNotiSelector);

    //Get Last message
    useEffect(() => {
        rooms.map((valRoom) => {
            if (valRoom.members.includes(uid) && valRoom.members.includes(userLogin.uid)) {
                setRoomId(valRoom.id);
                messages.map((valMess) => {
                    if (valMess.roomId === valRoom.id) {
                        setText(valMess.text);
                        if (valMess.createdAt) setCreatedAt(valMess.createdAt);
                        else setCreatedAt(0);
                    }
                });
                const emptyMessagesRoom = messages.filter((valMess) => {
                    return valRoom.id === valMess.roomId;
                });
                if (emptyMessagesRoom.length === 0) {
                    setIsEmptyRoom(true);
                    setCreatedAt(0);
                } else setIsEmptyRoom(false);
            }
        });
    }, [messages]);

    const handleClickAccount = () => {
        dispatch(ChoosedUserSlice.actions.setChoosedUser(user));
        dispatch(SelectedRoomSlice.actions.setSelectedRoom(roomId));

        //Remove Noti
        const newAmountNoti = amountNoti.filter((val) => val !== roomId);

        messages.map((val) => {
            if (val.roomId === roomId) {
                updateDocument('messages', val.id, {
                    ...val,
                    notification: false,
                });
            }
        });

        dispatch(AmountOfNotiSlice.actions.setAmountOfNoti(newAmountNoti));
    };

    const formatDate = (seconds) => {
        const today = new Date();
        const date = new Date(today - seconds).toLocaleDateString();
        if (date === 'Invalid Date') return '';
        return date;
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
        <li className={cx('accountItem')} onClick={handleClickAccount}>
            <div className={cx('avatar')}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={cx('infor')}>
                <h4>{name}</h4>
                <div className={cx('wrapper')}>
                    <span className={cx('content')}>{isEmptyRoom ? '' : text}</span>
                    <span className={cx('createdAt')}>{formatDate(createdAt.seconds)}</span>
                </div>
            </div>

            {amountNoti.includes(roomId) ? <div className={cx('noti')}></div> : <></>}

            <Tippy
                trigger="click"
                interactive
                placement="bottom-end"
                offset={[15, 0]}
                animation={true}
                onMount={onMount}
                onHide={onHide}
                render={(attrs) => (
                    <Box style={{ scale, opacity }} {...attrs}>
                        <div className={cx('wrapper-tool')}>
                            <SubnavWrapper>
                                <ToolList />
                            </SubnavWrapper>
                        </div>
                    </Box>
                )}
            >
                <div className={cx('tool')}>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </Tippy>
        </li>
    );
};

export default AccountItem;
