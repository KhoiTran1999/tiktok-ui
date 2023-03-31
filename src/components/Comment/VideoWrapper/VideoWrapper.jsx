import React from 'react';
import classNames from 'classnames/bind';
import style from './VideoWrapper.module.scss';
import LogoTiktokCircle from '../../../assets/icon/LogoTiktokCircle';
import VideoElement from './VideoElement/VideoElement';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
const VideoWrapper = ({ video }) => {
    const navigate = useNavigate();

    const [isPlay, setIsPlay] = useState(true);

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

    const handleGoback = (event) => {
        event.stopPropagation();
        navigate(-1);
    };

    const handleForward = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handlePlay} className={cx('videoWrapper')}>
            <span onClick={handleGoback} className={cx('escape-button')}>
                <i className="fa-solid fa-x"></i>
            </span>
            <span onClick={handleForward} className={cx('logoTiktok')}>
                <LogoTiktokCircle />
            </span>
            <span onClick={handleForward} className={cx('report')}>
                <i className="fa-regular fa-flag"></i>
                <span>Report</span>
            </span>

            <span onClick={handleForward} className={cx('up-button')}>
                <i className="fa-solid fa-chevron-up"></i>
            </span>
            <span onClick={handleForward} className={cx('down-button')}>
                <i className="fa-solid fa-chevron-down"></i>
            </span>
            <VideoElement video={video} classNameTimeLine={cx('timeLine')} videoRef={videoRef} isPlay={isPlay} />
        </div>
    );
};

export default VideoWrapper;
