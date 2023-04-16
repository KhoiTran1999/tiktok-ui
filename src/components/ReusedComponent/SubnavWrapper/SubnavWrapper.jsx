import classNames from 'classnames/bind';
import React from 'react';
import style from './style.module.scss';

const cx = classNames.bind(style);
const SubnavWrapper = ({
    className,
    children,
    scrollAction = 'auto',
    maxHeight = 'min(100vh - 96px - 60px, 734px)',
}) => {
    return (
        <div style={{ overflowY: scrollAction, maxHeight: maxHeight }} className={cx('wrapper', className)}>
            {children}
        </div>
    );
};

export default SubnavWrapper;
