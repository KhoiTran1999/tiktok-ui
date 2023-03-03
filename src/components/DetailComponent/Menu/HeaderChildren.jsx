import React, { memo } from 'react';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';

const cx = classNames.bind(style);
const HeaderChildren = ({ title, onBack }) => {
    return (
        <div className={cx('childrenTitle')}>
            <i className="fa-solid fa-chevron-left" onClick={onBack}></i>
            <h4>{title}</h4>
        </div>
    );
};

export default memo(HeaderChildren);
