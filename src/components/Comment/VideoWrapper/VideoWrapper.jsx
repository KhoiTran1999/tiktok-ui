import React from 'react';
import classNames from 'classnames/bind';
import style from './VideoWrapper.module.scss';
import LogoTiktokCircle from '../../../assets/icon/LogoTiktokCircle';
import VideoElement from './VideoElement/VideoElement';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(style);
const VideoWrapper = () => {
    const [isPlay, setIsPlay] = useState(false);

    const videoRef = useRef();

    useEffect(() => {
        if (isPlay) videoRef.current.play();
        else videoRef.current.pause();
    }, [isPlay]);

    const handlePlay = () => {
        if (isPlay) {
            setIsPlay(false);
        } else {
            setIsPlay(true);
        }
    };

    const handleTest = (event) => {
        event.stopPropagation();
        console.log('test');
    };

    return (
        <div onClick={handlePlay} className={cx('videoWrapper')}>
            <span onClick={handleTest} className={cx('escape-button')}>
                <i className="fa-solid fa-x"></i>
            </span>
            <span className={cx('logoTiktok')}>
                <LogoTiktokCircle />
            </span>
            <span className={cx('report')}>
                <i className="fa-regular fa-flag"></i>
                <span>Report</span>
            </span>

            <span className={cx('up-button')}>
                <i className="fa-solid fa-chevron-up"></i>
            </span>
            <span className={cx('down-button')}>
                <i className="fa-solid fa-chevron-down"></i>
            </span>
            <VideoElement classNameTimeLine={cx('timeLine')} videoRef={videoRef} isPlay={isPlay} />
        </div>
    );
};

export default VideoWrapper;
