import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { motion, useSpring } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LogoMessage from '../../../assets/icon/LogoMessage';
import LogoMessageActive from '../../../assets/icon/LogoMessageActive';
import LogoMessageBox from '../../../assets/icon/LogoMessageBox';
import LogoMessageBoxActive from '../../../assets/icon/LogoMessageBoxActive';
import routes from '../../../config/routes';
import { auth } from '../../../firebase/config';
import { updateDocument } from '../../../firebase/services';
import { AmountOfNotiSelector, UserSelector } from '../../../redux/selector';
import ChoosedUserSlice from '../../Messages/ChatAccountList/AccountItem/choosedUserSlice';
import SelectedRoomSlice from '../../Messages/ChatAccountList/AccountItem/selectedRoomSlice';
import { Button, ImageCustom, Menu, Wrapper } from '../../ReusedComponent';
import UserLoginSlice from '../../ReusedComponent/ModalSign/UserLoginSlice';
import style from './RightHeader.module.scss';
import SubMessageBox from './SubMessageBox/SubMessageBox';

const Box = styled(motion.div)``;
const cx = classNames.bind(style);

const LoginRightHeader = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeNoti, setActiveNoti] = useState(false);

    const user = useSelector(UserSelector);
    const anoumtOfNoti = useSelector(AmountOfNotiSelector);

    let dataMainMenuLogin = [
        {
            icon: <i className="fa-regular fa-user"></i>,
            title: t('header.Menu.viewProfile'),
            to: `/profile/${user.nickName}`,
        },
        {
            icon: <i className="fa-solid fa-gear"></i>,
            title: t('header.Menu.setting'),
        },
        {
            icon: <i className="fa-solid fa-font"></i>,
            title: t('header.Menu.language'),
            children: {
                childrenTitle: t('header.Menu.children Title Language'),
                list: [
                    {
                        title: 'Tiếng Việt (Việt Nam)',
                        code: 'vi',
                    },
                    {
                        title: 'English',
                        code: 'en',
                    },
                ],
            },
        },
        {
            icon: <i className="fa-regular fa-moon"></i>,
            title: t('header.Menu.darkMode'),
        },
        {
            icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
            title: t('header.Menu.logout'),
            action: 'logout',
        },
    ];

    const [isResetMenu, setIsResetMenu] = useState(false);

    const onLogout = () => {
        auth.signOut();
        navigate(routes.home);
        dispatch(
            UserLoginSlice.actions.setUser({
                login: false,
                displayName: '',
                nickName: '',
                email: '',
                photoURL: '',
                uid: '',
                providerID: '',
                keyword: '', //For key word searching
                bio: '',
                tick: false,
                followings: [],
                followers: [],
                likes: 0,
                websiteURL: '',
            }),
        );

        //reset after logout
        dispatch(ChoosedUserSlice.actions.setChoosedUser(null));
        dispatch(SelectedRoomSlice.actions.setSelectedRoom(null));
        dispatch(
            UserLoginSlice.actions.setUser({
                login: false,
                displayName: '',
                nickName: '',
                email: '',
                photoURL: '',
                uid: '',
                providerID: '',
                keyword: '', //For key word searching
                bio: '',
                tick: false,
                followings: [],
                followers: [],
                likes: [],
                websiteURL: '',
            }),
        );
    };

    //--------------Tippy Motion Framer-----------------------
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
    //--------------------------------------------------------

    const handleClickNoti = () => {
        setActiveNoti(!activeNoti);
        updateDocument('userList', user.id, {
            notification: {
                ...user.notification,
                status: false,
            },
        });
    };

    return (
        <div className={cx('group')}>
            <ul>
                <li>
                    <Link to={routes.upload}>
                        <Button basic medium className={cx('upload')}>
                            <i className="fa-solid fa-plus"></i> {t('header.upload')}
                        </Button>
                    </Link>
                </li>

                <li>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>{t('header.logoMessage')}</Wrapper>}>
                        <Link to={routes.messages}>
                            {anoumtOfNoti.length > 0 ? (
                                <>
                                    {window.location.pathname === '/messages' ? (
                                        <div className={cx('messages-wrap')}>
                                            <LogoMessageActive className={cx('message')} />
                                            <span className={cx('notiMessage')}>{anoumtOfNoti.length}</span>
                                        </div>
                                    ) : (
                                        <div className={cx('messages-wrap')}>
                                            <LogoMessage className={cx('message')} />
                                            <span className={cx('notiMessage')}>{anoumtOfNoti.length}</span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {window.location.pathname === '/messages' ? (
                                        <div className={cx('messages-wrap')}>
                                            <LogoMessageActive className={cx('message')} />
                                        </div>
                                    ) : (
                                        <div className={cx('messages-wrap')}>
                                            <LogoMessage className={cx('message')} />
                                        </div>
                                    )}
                                </>
                            )}
                        </Link>
                    </Tippy>
                </li>

                <li>
                    <Tippy
                        trigger="mouseenter"
                        placement="bottom"
                        render={(attrs) => <Wrapper>{t('header.logoInbox')}</Wrapper>}
                    >
                        <div className={cx('messageBox-wrap')} onClick={handleClickNoti}>
                            {!activeNoti && <LogoMessageBox className={cx('messageBox')} />}
                            {activeNoti && <LogoMessageBoxActive className={cx('messageBox')} />}
                            {user.notification.status && <div className={cx('dot-noti')}></div>}
                        </div>
                    </Tippy>
                    {activeNoti && <SubMessageBox />}
                </li>

                <li>
                    <div className={cx('menu')}>
                        <Tippy
                            // visible
                            delay={[0, 700]}
                            offset={[18, 10]}
                            placement="bottom-end"
                            interactive
                            hideOnClick={false}
                            animation={true}
                            onHide={onHide}
                            onMount={onMount}
                            onShow={() => {
                                setIsResetMenu(false);
                            }}
                            render={(attrs) => (
                                <Box style={{ scale, opacity }} {...attrs}>
                                    <Menu
                                        data={dataMainMenuLogin}
                                        className={cx('subnav-menu')}
                                        isResetMenu={isResetMenu}
                                        onLogout={onLogout}
                                    />
                                </Box>
                            )}
                        >
                            <ImageCustom src={user.photoURL} alt="avatar" />
                        </Tippy>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default LoginRightHeader;
