import React from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

const cx = classNames.bind(style);
const Header = () => {
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
                        <div className={cx('form-group')}>
                            <input id={cx('search')} type="search" placeholder="Tìm kiếm tài khoản và video" />
                            <label htmlFor={cx('search')}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </label>
                        </div>
                    </form>
                    <div className={cx('group')}>
                        <div className={cx('upload')}>
                            <button>
                                <i className="fa-solid fa-plus"></i> Tải lên
                            </button>
                        </div>
                        <div className={cx('message')}>
                            <img src={images.logoMessage} alt="" />
                            <div className={cx('title')}>
                                <p>Tin nhắn</p>
                            </div>
                        </div>
                        <div className={cx('message-box')}>
                            <img src={images.logoMessageBox} alt="" />
                            <div className={cx('title')}>
                                <p>Hộp thư</p>
                            </div>
                        </div>
                        <div className={cx('menu')}>
                            <img src={images.imgGaiXinh} alt="" />
                            <div className={cx('sub-nav')}>
                                <ul>
                                    <li>
                                        <i class="fa-regular fa-user"></i>Xem hồ sơ
                                    </li>
                                    <li>
                                        <i class="fa-brands fa-tiktok"></i>Nhận xu
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-video"></i>LIVE Studio
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-gear"></i>Cài đặt
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-font"></i>Tiếng Việt
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-question"></i>Phản hồi và trợ giúp
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-keyboard"></i>Phím tắt trên bàn phím
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-moon"></i>Chế độ tối
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
