import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import React, { useState } from 'react';
import 'animate.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../../../../../redux/selector';
import { Menu } from '../../../../ReusedComponent';
import ModalSignSlice from '../../../../ReusedComponent/ModalSign/ModalSignSlice';
import style from './UserInteractive.module.scss';
import { updateDocument } from '../../../../../firebase/services';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
const Box = styled(motion.div)``;

const UserInteractive = ({ video, userVideo }) => {
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

    useEffect(() => {
        if (video.likes.includes(user.uid)) setHeart(true);
        else setHeart(false);
    });

    const handleHeartActive = () => {
        if (user.login === true) {
            if (video.likes.includes(user.uid)) {
                const newLikes = video.likes.filter((val) => val !== user.uid);
                updateDocument('videoList', video.id, { likes: newLikes });

                const newUserLikes = user.likes.filter((val) => val !== video.id);
                updateDocument('userList', user.id, { ...user, likes: newUserLikes });
                return;
            } else {
                updateDocument('videoList', video.id, { likes: [...video.likes, user.uid] });

                updateDocument('userList', user.id, {
                    ...user,
                    likes: [...user.likes, video.id],
                });
            }
        } else dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    return (
        <div className={cx('user-interactive')}>
            <div className={cx('icon-wrapper')} onClick={handleHeartActive}>
                <i
                    className={cx('fa-solid fa-heart', {
                        'heart-active': heart && user.login === true,
                        'animate__animated animate__bounceIn': heart && user.login === true,
                    })}
                ></i>
            </div>
            <p>{video.likes.length}</p>
            <Link to={`/profile/${userVideo.nickName}/${video.id}`}>
                <div className={cx('icon-wrapper')}>
                    <i className="fa-solid fa-comment-dots"></i>
                </div>
            </Link>
            <p>{video.comments.length}</p>
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
                    <p>{video.shares}</p>
                </div>
            </Tippy>
        </div>
    );
};

export default UserInteractive;
