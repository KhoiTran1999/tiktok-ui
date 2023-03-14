import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderContainer.module.scss';
import { Button } from '../../../DetailComponent';

const cx = classNames.bind(style);
const HeaderContainer = () => {
    return (
        <div className={cx('header-container')}>
            <div className={cx('info-container')}>
                <span className={cx('wrap')}>
                    <span className={cx('nickname')}>Nickname</span>
                    <span className={cx('name')}>Full-Name</span>
                </span>
                <p className={cx('status')}>
                    đúng nhận sai cãi... <b className={cx('hash-tag')}>#story #tamtrang # duongthaithuyy</b>
                </p>
                <span className={cx('music')}>
                    <i className="fa-solid fa-music"></i> Flop nhất link nhạc - Hayato_shiro
                </span>
            </div>
            <Button outline small>
                Follow
            </Button>
        </div>
    );
};

export default HeaderContainer;
