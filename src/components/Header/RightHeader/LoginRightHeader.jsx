import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';

import { Button, ImageCustom, Menu, Wrapper } from '../../DetailComponent';
import LogoMessage from '../../../assets/icon/LogoMessage';
import LogoMessageBox from '../../../assets/icon/LogoMessageBox';
import images from '../../../assets/images';
import LogoEffect from '../../../assets/icon/LogoEffect';
import style from './RightHeader.module.scss';
import ModalSignSlice from '../../DetailComponent/ModalSign/ModalSignSlice';

const cx = classNames.bind(style);

const LoginRightHeader = () => {
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

    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <div className={cx('group')}>
            <ul>
                <li>
                    <Button basic medium className={cx('upload')}>
                        <i className="fa-solid fa-plus"></i> {t('header.upload')}
                    </Button>
                </li>

                <li>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>{t('header.logoEffect')}</Wrapper>}>
                        <LogoEffect className={cx('effectLogo')} width="2.3rem" />
                    </Tippy>
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
                                    // onLogout={onLogout}
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
    );
};

export default LoginRightHeader;
