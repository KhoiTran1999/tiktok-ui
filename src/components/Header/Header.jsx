import React, { useEffect, useState } from 'react';
import Tippy, { tippy } from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import images from '../../assets/images';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import SubnavWrapper from '../SubnavWrapper';

const cx = classNames.bind(style);
const Header = () => {
    const [accoutList, setAccountList] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setAccountList([1, 2, 3]);
        }, 1000);
    }, []);
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
                                        <p>khoitran</p>
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
                        <div className={cx('upload')}>
                            <button>
                                <i className="fa-solid fa-plus"></i> Tải lên
                            </button>
                        </div>
                        <Tippy content="Tin nhắn">
                            <div className={cx('message')}>
                                <img src={images.logoMessage} alt="" />
                            </div>
                        </Tippy>
                        <Tippy content="Hộp thư">
                            <div className={cx('message-box')}>
                                <img src={images.logoMessageBox} alt="" />
                            </div>
                        </Tippy>

                        <div className={cx('menu')}>
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('sub-nav')} tabIndex="-1" {...attrs}>
                                        <SubnavWrapper>
                                            <ul>
                                                <li>
                                                    <i className="fa-regular fa-user"></i>Xem hồ sơ
                                                </li>
                                                <li>
                                                    <i className="fa-brands fa-tiktok"></i>Nhận xu
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-video"></i>LIVE Studio
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-gear"></i>Cài đặt
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-font"></i>Tiếng Việt
                                                </li>
                                                <li>
                                                    <i className="fa-regular fa-circle-question"></i>Phản hồi và trợ
                                                    giúp
                                                </li>
                                                <li>
                                                    <i className="fa-regular fa-keyboard"></i>Phím tắt trên bàn phím
                                                </li>
                                                <li>
                                                    <i className="fa-regular fa-moon"></i>Chế độ tối
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
                                                </li>
                                            </ul>
                                        </SubnavWrapper>
                                    </div>
                                )}
                            >
                                <img src={images.imgGaiXinh} width="100px" alt="" />
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
