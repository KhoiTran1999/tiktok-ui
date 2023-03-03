import React, { useRef } from 'react';
import style from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const SubnavWrapper = ({ className, children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default SubnavWrapper;
