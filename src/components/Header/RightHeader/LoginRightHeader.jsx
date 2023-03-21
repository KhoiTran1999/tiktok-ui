import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import LogoMessage from '../../../assets/icon/LogoMessage';
import LogoMessageActive from '../../../assets/icon/LogoMessageActive';
import LogoMessageBox from '../../../assets/icon/LogoMessageBox';
import { auth } from '../../../firebase/config';
import { UserSelector } from '../../../redux/selector';
import { Button, ImageCustom, Menu, Wrapper } from '../../DetailComponent';
import UserLoginSlice from '../../DetailComponent/ModalSign/UserLoginSlice';
import style from './RightHeader.module.scss';
import routes from '../../../config/routes';

const Box = styled(motion.div)``;
const cx = classNames.bind(style);

const LoginRightHeader = () => {
    const { t } = useTranslation();
    const dataMainMenuLogin = [
        {
            icon: <i className="fa-regular fa-user"></i>,
            title: t('header.Menu.viewProfile'),
        },
        {
            icon: <i className="fa-brands fa-tiktok"></i>,
            title: t('header.Menu.getCoin'),
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
            icon: <i className="fa-regular fa-circle-question"></i>,
            title: t('header.Menu.feedBackAndHelp'),
            to: '/feedback',
        },
        {
            icon: <i className="fa-regular fa-keyboard"></i>,
            title: t('header.Menu.keyboard'),
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

    const dispatch = useDispatch();
    const user = useSelector(UserSelector);
    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();
        navigate(routes.home);
        dispatch(UserLoginSlice.actions.setUser(''));
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

    return (
        <div className={cx('group')}>
            <ul>
                <li>
                    <Button basic medium className={cx('upload')}>
                        <i className="fa-solid fa-plus"></i> {t('header.upload')}
                    </Button>
                </li>

                <li>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>{t('header.logoMessage')}</Wrapper>}>
                        <Link to={routes.messages}>
                            {window.location.pathname === '/messages' ? (
                                <LogoMessageActive className={cx('message')} />
                            ) : (
                                <LogoMessage className={cx('message')} />
                            )}
                        </Link>
                    </Tippy>
                </li>

                <li>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>{t('header.logoInbox')}</Wrapper>}>
                        <LogoMessageBox className={cx('messageBox')} />
                    </Tippy>
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
