import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListContent.module.scss';
import videos from '../../../assets/videos';
import { Button, ImageCustom } from '../../DetailComponent';
import images from '../../../assets/images';

const cx = classNames.bind(style);
const ListContent = () => {
    const [play, setPlay] = useState(false);
    const playRef = useRef(null);

    const handlePlay = () => {
        console.log(playRef.current.buffered[0]);
        if (play) {
            setPlay(false);
            playRef.current.pause();
        } else {
            setPlay(true);
            playRef.current.play();
        }
    };

    return (
        <div className={cx('list-content')}>
            <ul>
                <li>
                    <div className={cx('avatar')}>
                        <ImageCustom src={images.imgGaiXinh} alt="avatar" />
                    </div>
                    <div className={cx('content-container')}>
                        <div className={cx('header-container')}>
                            <div className={cx('info-container')}>
                                <span className={cx('wrap')}>
                                    <span className={cx('nickname')}>Nickname</span>
                                    <span className={cx('name')}>Full-Name</span>
                                </span>
                                <p className={cx('status')}>
                                    đúng nhận sai cãi...{' '}
                                    <b className={cx('hash-tag')}>#story #tamtrang # duongthaithuyy</b>
                                </p>
                                <span className={cx('music')}>
                                    <i className="fa-solid fa-music"></i> Flop nhất link nhạc - Hayato_shiro
                                </span>
                            </div>
                            <Button outline small>
                                Follow
                            </Button>
                        </div>
                        <div className={cx('video-wrapper')}>
                            <video loop ref={playRef} poster={images.imgGaiXinh}>
                                <source src={videos.video12} type={'video/mp4'} />
                                Your browser does not support the video tag.
                            </video>
                            <i
                                onClick={handlePlay}
                                className={cx('play-button', {
                                    'fa-solid fa-play': !play,
                                    'fa-solid fa-pause': play,
                                })}
                            ></i>
                            <i className={cx('fa-solid fa-volume-high', 'volume-button')}></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ListContent;
