import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css';
// import 'tippy.js/animations/perspective.css';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import AccountSearch from '../AccountSearch';
import Button from '../Button';
import SubnavWrapper from '../SubnavWrapper';
import Wrapper from '../Wrapper';
import style from './style.module.scss';

const cx = classNames.bind(style);
const Header = () => {
    const [accoutList, setAccountList] = useState([]);

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
                        <div className={cx('upload')}>
                            <Button basic medium>
                                <i className="fa-solid fa-plus"></i> Tải lên
                            </Button>
                        </div>
                        <Tippy
                            interactive
                            render={(attrs) => (
                                <Wrapper>
                                    <span>Tin nhắn</span>
                                </Wrapper>
                            )}
                        >
                            <div className={cx('message')}>
                                <img src={images.logoMessage} alt="" />
                            </div>
                        </Tippy>
                        <Tippy
                            interactive
                            render={(attrs) => (
                                <Wrapper>
                                    <span>Hộp thư</span>
                                </Wrapper>
                            )}
                        >
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
