import classNames from 'classnames/bind';
import React from 'react';
import style from './style.module.scss';

const cx = classNames.bind(style);
const SubnavWrapper = ({ className, children }) => {
    return <div className={cx('wrapper', className)}>{children}</div>;
};

export default SubnavWrapper;
