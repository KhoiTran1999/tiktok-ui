import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { UserSelector } from '../../../redux/selector';
import { Button, Menu } from '../../ReusedComponent';
import ModalSignSlice from '../../ReusedComponent/ModalSign/ModalSignSlice';
import style from './RightHeader.module.scss';

const Box = styled(motion.div)``;
const cx = classNames.bind(style);
const UnloginRightHeader = () => {
    const { t } = useTranslation();
    const dataMainMenuUnLogin = [
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
    ];
    const [isResetMenu, setIsResetMenu] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(UserSelector);

    const handleLogin = () => {
        dispatch(ModalSignSlice.actions.setModalSign(true));
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
        setIsResetMenu(false);
        scale.set(initialScale);
        opacity.set(0);
    }
    //------------------------------------------------------
    return (
        <div style={{ marginRight: '-20px' }} className={cx('group')}>
            <ul>
                <li>
                    <Button
                        basic
                        medium
                        className={cx('upload', {
                            skeletonLoading: user.login === null,
                        })}
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        <i className="fa-solid fa-plus"></i> {t('header.upload')}
                    </Button>
                </li>

                <li>
                    <Button
                        primary
                        medium
                        onClick={() => {
                            handleLogin();
                        }}
                        className={cx('login-button', {
                            skeletonLoading: user.login === null,
                        })}
                    >
                        <span style={{ padding: '0px 15px' }}>{t('header.login')}</span>
                    </Button>
                </li>

                <li>
                    <div
                        style={{ marginBottom: '7px' }}
                        className={cx('menu', { skeletonLoading: user.login === null })}
                    >
                        <Tippy
                            // visible
                            delay={[0, 700]}
                            offset={[18, 10]}
                            hideOnClick={false}
                            placement="bottom-end"
                            interactive
                            animation={true}
                            onMount={onMount}
                            onHide={onHide}
                            onShow={() => {
                                setIsResetMenu(false);
                            }}
                            render={(attrs) => (
                                <Box style={{ scale, opacity }} {...attrs}>
                                    <Menu
                                        data={dataMainMenuUnLogin}
                                        className={cx('subnav-menu')}
                                        isResetMenu={isResetMenu}
                                    />
                                </Box>
                            )}
                        >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Tippy>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default UnloginRightHeader;
