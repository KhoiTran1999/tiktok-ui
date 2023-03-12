import React from 'react';
import classNames from 'classnames/bind';
import style from './Foryou.module.scss';

const cx = classNames.bind(style);
const Foryou = () => {
    return (
        <div className={cx('foryou')}>
            <h1>Foryou</h1>
        </div>
    );
};

export default Foryou;
