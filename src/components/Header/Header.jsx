import React, { useCallback, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import '../../translation/i18n.js';
import LogoEffect from '../../assets/icon/LogoEffect';
import LogoMessage from '../../assets/icon/LogoMessage';
import LogoMessageBox from '../../assets/icon/LogoMessageBox';
import LogoTiktok from '../../assets/icon/LogoTiktok';
import images from '../../assets/images';
import { Button, ImageCustom, Menu, Wrapper } from '../DetailComponent';
import FormSearch from '../DetailComponent/FormSearch';
import style from './Header.module.scss';
import routes from '../../config/routes.js';

const cx = classNames.bind(style);

const Header = () => {
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

    const [isLogin, setIsLogin] = useState(false);
    const [isResetMenu, setIsResetMenu] = useState(false);

    const onLogout = useCallback(() => {
        setIsLogin(false);
    }, []);

    return (
        <header>
            <div className="container">
                <div className={cx('row')}>
                    <h1 className={cx('logo')}>
                        <Link to={routes.home}>
                            <LogoTiktok />
                        </Link>
                    </h1>
                    <FormSearch />
                    {isLogin ? (
                        <div className={cx('group')}>
                            <ul>
                                <li>
                                    <Button basic medium className={cx('upload')}>
                                        <i className="fa-solid fa-plus"></i> {t('header.upload')}
                                    </Button>
                                </li>

                                <li>
                                    <Tippy
                                        placement="bottom"
                                        render={(attrs) => <Wrapper>{t('header.logoEffect')}</Wrapper>}
                                    >
                                        <LogoEffect className={cx('effectLogo')} width="2.3rem" />
                                    </Tippy>
                                </li>

                                <li>
                                    <Tippy
                                        placement="bottom"
                                        render={(attrs) => <Wrapper>{t('header.logoMessage')}</Wrapper>}
                                    >
                                        <LogoMessage className={cx('message')} />
                                    </Tippy>
                                </li>

                                <li>
                                    <Tippy
                                        placement="bottom"
                                        render={(attrs) => <Wrapper>{t('header.logoInbox')}</Wrapper>}
                                    >
                                        <LogoMessageBox className={cx('messageBox')} />
                                    </Tippy>
                                </li>

                                <li>
                                    <div className={cx('menu')}>
                                        <Tippy
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
                                            <ImageCustom src={images.imgGaiXinh} alt="avatar" />
                                        </Tippy>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div style={{ marginRight: '-20px' }} className={cx('group')}>
                            <ul>
                                <li>
                                    <Button basic medium className={cx('upload')}>
                                        <i className="fa-solid fa-plus"></i> {t('header.upload')}
                                    </Button>
                                </li>

                                <li>
                                    <Button
                                        primary
                                        medium
                                        onClick={() => {
                                            setIsLogin(true);
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
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
