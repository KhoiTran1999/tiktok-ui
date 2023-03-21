import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

import { CurrentRoomsSelector, UserSelector } from '../../../../redux/selector';
import ChoosedUserSlice from '../../ChatBox/choosedUserSlice';
import style from './AccountItem.module.scss';
import { SubnavWrapper } from '../../../DetailComponent';
import ToolList from './ToolList/ToolList';

const Box = styled(motion.div)``;
const cx = classNames.bind(style);
const AccountItem = ({ messages, uid, avatar, name, user }) => {
    const dispatch = useDispatch();

    const [createdAt, setCreatedAt] = useState('');
    const [text, setText] = useState('');

    const userLogin = useSelector(UserSelector);
    const rooms = useSelector(CurrentRoomsSelector);

    useEffect(() => {
        rooms.map((val) => {
            if (val.members.includes(uid) && val.members.includes(userLogin.uid)) {
                messages.map((valMess) => {
                    if (valMess.roomId === val.id) {
                        setText(valMess.text);
                        if (valMess.createdAt) setCreatedAt(valMess.createdAt);
                        else setCreatedAt(0);
                    }
                });
            }
        });
    }, [messages]);

    const handleClickAccount = () => {
        dispatch(ChoosedUserSlice.actions.setChoosedUser(user));
    };

    const formatDate = (seconds) => {
        const today = new Date();
        const date = new Date(today - seconds).toLocaleDateString();
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
                    <span className={cx('content')}>{text}</span>
                    <span className={cx('createdAt')}>{formatDate(createdAt.seconds) || ''}</span>
                </div>
            </div>
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
