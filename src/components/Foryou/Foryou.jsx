import React from 'react';
import classNames from 'classnames/bind';
import style from './Foryou.module.scss';
import ListContent from './ListContent/ListContent';

const cx = classNames.bind(style);
const Foryou = () => {
    return (
        <div className={cx('foryou')}>
            <ListContent />
        </div>
    );
};

export default Foryou;
