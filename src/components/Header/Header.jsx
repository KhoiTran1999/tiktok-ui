import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import AccountSearch from '../AccountSearch';
import Button from '../Button';
import Menu from '../Menu';
import SubnavWrapper from '../SubnavWrapper';
import Wrapper from '../Wrapper';
import style from './Header.module.scss';

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
                        <Button basic medium className={cx('upload')}>
                            <i className="fa-solid fa-plus"></i> Tải lên
                        </Button>

                        <Button primary medium>
                            <span>Đăng nhập</span>
                        </Button>

                        <div className={cx('menu')}>
                            <Tippy
                                delay={[0, 700]}
                                offset={[18, 10]}
                                placement="bottom-end"
                                interactive
                                render={(attrs) => <Menu className={cx('subnav-menu')} />}
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
