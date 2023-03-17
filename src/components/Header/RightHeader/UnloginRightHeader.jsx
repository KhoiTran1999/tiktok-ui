import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';

import { Button, ImageCustom, Menu, Wrapper } from '../../DetailComponent';
import LogoEffect from '../../../assets/icon/LogoEffect';
import style from './RightHeader.module.scss';
import ModalSignSlice from '../../DetailComponent/ModalSign/ModalSignSlice';

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
    ];
    const [isResetMenu, setIsResetMenu] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(ModalSignSlice.actions.changeModalSign(true));
    };
    return (
        <div style={{ marginRight: '-20px' }} className={cx('group')}>
            <ul>
                <li>
                    <Button
                        basic
                        medium
                        className={cx('upload')}
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
                    >
                        <span style={{ padding: '0px 15px' }}>{t('header.login')}</span>
                    </Button>
                </li>

                <li>
                    <Tippy render={(attrs) => <Wrapper>{t('header.logoEffect')}</Wrapper>}>
                        <LogoEffect className={cx('effectLogo')} width="2.3rem" />
                    </Tippy>
                </li>
                <li>
                    <div style={{ marginBottom: '7px' }} className={cx('menu')}>
                        <Tippy
                            // visible
                            delay={[0, 700]}
                            offset={[18, 10]}
                            hideOnClick={false}
                            placement="bottom-end"
                            interactive
                            render={(attrs) => (
                                <Menu
                                    data={dataMainMenuUnLogin}
                                    className={cx('subnav-menu')}
                                    isResetMenu={isResetMenu}
                                />
                            )}
                            onHide={() => {
                                setIsResetMenu(true);
                            }}
                            onShow={() => {
                                setIsResetMenu(false);
                            }}
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
