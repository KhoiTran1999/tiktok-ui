import React from 'react';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import SubnavWrapper from '../SubnavWrapper';
import MenuItem from './MenuItem';

const cx = classNames.bind(style);
const Menu = ({ className, data }) => {
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
