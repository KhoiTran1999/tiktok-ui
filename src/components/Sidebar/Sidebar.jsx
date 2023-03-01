import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);
const Sidebar = () => {
    return (
        <div className={cx('side-bar')}>
            <div className="container">
                <h1>hello</h1>
            </div>
        </div>
    );
};

export default Sidebar;
