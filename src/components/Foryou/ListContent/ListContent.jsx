import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListContent.module.scss';
import videos from '../../../assets/videos';
import { Button, ImageCustom } from '../../DetailComponent';
import images from '../../../assets/images';

const cx = classNames.bind(style);
const ListContent = () => {
    const [play, setPlay] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);

    const fillVolumeRef = useRef('40px');
    const videoRef = useRef(null);

    useEffect(() => {
        fillVolumeRef.current.style.height = '40px';
    }, []);

    const handlePlay = () => {
        if (play) {
            setPlay(false);
            videoRef.current.pause();
        } else {
            setPlay(true);
            videoRef.current.play();
        }
    };

    const handleVolume = () => {
        if (muted) {
            setMuted(false);
            videoRef.current.muted = false;
        } else {
            setMuted(true);
            videoRef.current.muted = true;
        }
    };

    const handleSetVolume = (e) => {
        setVolume(e.target.value);
        videoRef.current.volume = e.target.value;

        //Hanlde fill bar volume
        const WIDTH_FILL_BAR = 50 * e.target.value; //50px
        fillVolumeRef.current.style.height = `${WIDTH_FILL_BAR}px`;

        //muted icon when muted
        if (+e.target.value === 0) {
            setMuted(true);
            videoRef.current.muted = muted;
            return;
        } else {
            setMuted(false);
            videoRef.current.muted = muted;
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
                            <video loop ref={videoRef} poster={images.imgGaiXinh}>
                                <source src={videos.video2} type={'video/mp4'} />
                                Your browser does not support the video tag.
                            </video>
                            <i
                                onClick={handlePlay}
                                className={cx('play-button', {
                                    'fa-solid fa-play': !play,
                                    'fa-solid fa-pause': play,
                                })}
                            ></i>
                            <div className={cx('volume-wrapper')}>
                                <input
                                    className={cx('volume-bar')}
                                    onChange={(e) => handleSetVolume(e)}
                                    type="range"
                                    value={volume}
                                    min="0"
                                    max="1"
                                    step="0.1"
                                />
                                <div ref={fillVolumeRef} className={cx('fill-bar')}></div>
                                <i
                                    onClick={handleVolume}
                                    className={cx('volume-button', {
                                        'fa-solid fa-volume-high': !muted,
                                        'fa-solid fa-volume-xmark': muted,
                                    })}
                                ></i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ListContent;
