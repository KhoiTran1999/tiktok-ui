import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import { AccountSearch } from '../DetailComponent';
import { Button } from '../DetailComponent';
import { Menu } from '../DetailComponent';
import { SubnavWrapper } from '../DetailComponent';
import { Wrapper } from '../DetailComponent';
import style from './Header.module.scss';

const cx = classNames.bind(style);
const Header = () => {
    const dataMainMenu = [
        {
            icon: <i className="fa-regular fa-user"></i>,
            title: 'Xem hồ sơ',
        },
        {
            icon: <i className="fa-brands fa-tiktok"></i>,
            title: 'Nhận xu',
        },
        {
            icon: <i className="fa-solid fa-video"></i>,
            title: 'LIVE Studio',
        },
        {
            icon: <i className="fa-solid fa-gear"></i>,
            title: 'Cài đặt',
        },
        {
            icon: <i className="fa-solid fa-font"></i>,
            title: 'Tiếng Việt',
            children: {
                childrenTitle: 'Ngôn ngữ',
                list: [
                    {
                        title: 'Tiếng Việt (Việt Nam)',
                    },
                    {
                        title: 'English',
                    },
                    {
                        title: 'Deutsh',
                    },
                ],
            },
        },
        {
            icon: <i className="fa-regular fa-circle-question"></i>,
            title: 'Phản hồi và trợ giúp',
            to: '/feedback',
        },
        {
            icon: <i className="fa-regular fa-keyboard"></i>,
            title: 'Phím tắt trên bàn phím',
        },
        {
            icon: <i className="fa-regular fa-moon"></i>,
            title: 'Chế độ tối',
        },
        {
            icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
            title: 'Đăng xuất',
        },
    ];

    const [accoutList, setAccountList] = useState([]);
    const [isHide, setIsHide] = useState(false);

    return (
        <header>
            <div className="container">
                <div className={cx('row')}>
                    <h1 className={cx('logo')}>
                        <Link to="/">
                            <img src={images.logoTiktok} alt="Tiktok" />
                        </Link>
                    </h1>
                    <form action="search">
                        <Tippy
                            placement="bottom-start"
                            interactive={true}
                            visible={accoutList.length > 0}
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                    <SubnavWrapper>
                                        <span className={cx('account-title')}>Tài khoản</span>
                                        <AccountSearch />
                                        <AccountSearch />
                                        <AccountSearch />
                                    </SubnavWrapper>
                                </div>
                            )}
                        >
                            <input
                                id={cx('search')}
                                autoComplete={'off'}
                                type="search"
                                required
                                placeholder="Tìm kiếm tài khoản và video"
                            />
                        </Tippy>
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <div className={cx('group')}>
                        <Button basic medium className={cx('upload')}>
                            <i className="fa-solid fa-plus"></i> Tải lên
                        </Button>

                        <Button primary medium>
                            <span>Đăng nhập</span>
                        </Button>
                        <Tippy render={(attrs) => <Wrapper>Tạo hiệu ứng</Wrapper>}>
                            <img
                                style={{ cursor: 'pointer', marginLeft: '20px' }}
                                src={images.createEffectLogo}
                                alt=""
                            />
                        </Tippy>
                        <div className={cx('menu')}>
                            <Tippy
                                // visible
                                delay={[0, 700]}
                                offset={[18, 10]}
                                placement="bottom-end"
                                interactive
                                render={(attrs) => (
                                    <Menu data={dataMainMenu} className={cx('subnav-menu')} isHide={isHide} />
                                )}
                                onHide={() => {
                                    setIsHide(true);
                                }}
                                onShow={() => {
                                    setIsHide(false);
                                }}
                            >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
