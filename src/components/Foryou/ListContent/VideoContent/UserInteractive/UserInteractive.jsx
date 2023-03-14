import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import 'animate.css';
import style from './UserInteractive.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const UserInteractive = () => {
    const [heart, setHeart] = useState(false);

    const handleHeartActive = () => {
        if (heart) {
            setHeart(false);
            return;
        } else {
            setHeart(true);
        }
    };

    return (
        <div className={cx('user-interactive')}>
            <div className={cx('icon-wrapper')} onClick={handleHeartActive}>
                <i
                    className={cx('fa-solid fa-heart', {
                        'heart-active': heart,
                        'animate__animated animate__heartBeat': heart,
                    })}
                ></i>
            </div>
            <p>1.4M</p>
            <div className={cx('icon-wrapper')}>
                <i className="fa-solid fa-comment-dots"></i>
            </div>
            <p>7789</p>
            <div className={cx('icon-wrapper')}>
                <i className="fa-solid fa-share"></i>
            </div>
            <p>17.8k</p>
        </div>
    );
};

export default UserInteractive;
