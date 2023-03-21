import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import React, { useState } from 'react';
import 'animate.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../../../../../redux/selector';
import { Menu } from '../../../../DetailComponent';
import ModalSignSlice from '../../../../DetailComponent/ModalSign/ModalSignSlice';
import style from './UserInteractive.module.scss';

const cx = classNames.bind(style);
const Box = styled(motion.div)``;

const UserInteractive = () => {
    const MenuShare = [
        {
            icon: <i className="fa-solid fa-code"></i>,
            title: 'Embed',
        },
        {
            icon: <i className="fa-solid fa-paper-plane"></i>,
            title: 'Send to friends',
        },
        {
            icon: <i className="fa-brands fa-facebook"></i>,
            title: 'Share to Facebook',
        },
        {
            icon: <i className="fa-brands fa-whatsapp"></i>,
            title: 'Share to WhatsApp',
        },
        {
            icon: <i className="fa-solid fa-link"></i>,
            title: 'Copy link',
        },
        {
            dropDown: <i className="fa-solid fa-angle-down"></i>,
            children: {
                list: [
                    {
                        icon: <i className="fa-solid fa-code"></i>,
                        title: 'Embed',
                    },
                    {
                        icon: <i className="fa-solid fa-paper-plane"></i>,
                        title: 'Send to friends',
                    },
                    {
                        icon: <i className="fa-brands fa-facebook"></i>,
                        title: 'Share to Facebook',
                    },
                    {
                        icon: <i className="fa-brands fa-whatsapp"></i>,
                        title: 'Share to WhatsApp',
                    },
                    {
                        icon: <i className="fa-solid fa-link"></i>,
                        title: 'Copy link',
                    },
                    {
                        icon: <i className="fa-brands fa-twitter"></i>,
                        title: 'Share to Twitter',
                    },
                    {
                        icon: <i className="fa-brands fa-linkedin-in"></i>,
                        title: 'Share to Linkedln',
                    },
                    {
                        icon: <i className="fa-brands fa-reddit-alien"></i>,
                        title: 'Share to Reddit',
                    },
                    {
                        icon: <i className="fa-brands fa-telegram"></i>,
                        title: 'Share to Telegram',
                    },
                    {
                        icon: <i className="fa-solid fa-envelope"></i>,
                        title: 'Share to Email',
                    },
                    {
                        icon: <i className="fa-brands fa-line"></i>,
                        title: 'Share to Line',
                    },
                    {
                        icon: <i className="fa-brands fa-pinterest"></i>,
                        title: 'Share to Pinterest',
                    },
                ],
            },
        },
    ];
    const [heart, setHeart] = useState(false);
    const [isResetMenu, setIsResetMenu] = useState(false);
    const user = useSelector(UserSelector);

    const dispatch = useDispatch();

    //-----------Tippy Framer Motion----------------------
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
        setIsResetMenu(true);
        scale.set(initialScale);
        opacity.set(0);
    }
    //----------------------------------------------------

    const handleHeartActive = () => {
        if (user.login === true) {
            if (heart) {
                setHeart(false);
                return;
            } else {
                setHeart(true);
            }
        } else dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    const handleClickComment = () => {
        if (user.login === false) dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    return (
        <div className={cx('user-interactive')}>
            <div className={cx('icon-wrapper')} onClick={handleHeartActive}>
                <i
                    className={cx('fa-solid fa-heart', {
                        'heart-active': heart,
                        'animate__animated animate__bounceIn': heart,
                    })}
                ></i>
            </div>
            <p>1.4M</p>
            <div className={cx('icon-wrapper')} onClick={handleClickComment}>
                <i className="fa-solid fa-comment-dots"></i>
            </div>
            <p>7789</p>
            <Tippy
                trigger="click mouseenter"
                delay={[500, 500]}
                interactive
                placement="top-start"
                animation={true}
                onMount={onMount}
                onHide={onHide}
                onShow={() => {
                    setIsResetMenu(false);
                }}
                render={(attrs) => (
                    <Box style={{ scale, opacity }} {...attrs}>
                        <Menu data={MenuShare} isResetMenu={isResetMenu} />
                    </Box>
                )}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('icon-wrapper')}>
                        <i className="fa-solid fa-share"></i>
                    </div>
                    <p>17.8k</p>
                </div>
            </Tippy>
        </div>
    );
};

export default UserInteractive;
