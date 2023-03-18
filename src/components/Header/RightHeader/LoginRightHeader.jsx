import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import LogoMessage from '../../../assets/icon/LogoMessage';
import LogoMessageBox from '../../../assets/icon/LogoMessageBox';
import { auth } from '../../../firebase/config';
import { UserSelector } from '../../../redux/selector';
import { Button, ImageCustom, Menu, Wrapper } from '../../DetailComponent';
import UserLoginSlice from '../../DetailComponent/ModalSign/UserLoginSlice';
import style from './RightHeader.module.scss';

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

    const onLogout = () => {
        auth.signOut();
        dispatch(UserLoginSlice.actions.setUser(''));
    };

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
                        <LogoMessage className={cx('message')} />
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
                            render={(attrs) => (
                                <Menu
                                    data={dataMainMenuLogin}
                                    className={cx('subnav-menu')}
                                    isResetMenu={isResetMenu}
                                    onLogout={onLogout}
                                />
                            )}
                            onHide={() => {
                                setIsResetMenu(true);
                            }}
                            onShow={() => {
                                setIsResetMenu(false);
                            }}
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
