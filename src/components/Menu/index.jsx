import React from 'react';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import SubnavWrapper from '../SubnavWrapper';
import MenuItem from './MenuItem';

const cx = classNames.bind(style);
const Menu = ({ className }) => {
    const data = [
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
    const classes = cx('sub-nav', {
        [className]: className,
    });
    return (
        <div className={classes}>
            <SubnavWrapper>
                <ul>
                    <MenuItem data={data} />
                </ul>
            </SubnavWrapper>
        </div>
    );
};

export default Menu;
