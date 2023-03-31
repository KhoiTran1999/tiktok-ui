import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import images from '../../../../assets/images';
import style from './VideoElement.module.scss';

const cx = classNames.bind(style);
const VideoElement = ({ videoRef, isPlay, classNameTimeLine }) => {
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [time, setTime] = useState(0);

    const fillVolumeRef = useRef();
    const duration = useRef(0);
    const fillBarTimeLineRef = useRef('0px');

    useEffect(() => {
        videoRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        videoRef.current.volume = volume;
        fillVolumeRef.current.style = `height: ${volume * 80}px`;
        if (+volume === 0) setMuted(true);
        else setMuted(false);
    }, [volume]);

    useEffect(() => {
        videoRef.current.oncanplay = () => {
            duration.current = videoRef.current.duration || 0;
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            setTime(videoRef.current.currentTime);
        }
    }, [time]);

    const handleMuted = (event) => {
        event.stopPropagation();
        setMuted(!muted);
    };

    const handleVolume = (e) => {
        e.stopPropagation();
        setVolume(e.target.value);
    };

    const formatTime = (time) => {
        const minutes = Math.floor((time / 60) % 10).toString();
        const dozenMinutes = Math.floor(time / 60 / 10).toString();
        const seconds = Math.floor((time % 60) % 10).toString();
        const dozenSeconds = Math.floor((time % 60) / 10).toString();

        return `${dozenMinutes}${minutes}:${dozenSeconds}${seconds}`;
    };

    const handleForwardVideo = (e) => {
        setTime(e.target.value);
        videoRef.current.currentTime = e.target.value;
    };

    const handleTimeupdate = () => {
        setTime(Math.floor(videoRef.current.currentTime));
        fillBarTimeLineRef.current.style = `width: ${260 * (videoRef.current.currentTime / duration.current)}px`;
    };

    return (
        <>
            <div className={cx('video')}>
                <video onTimeUpdate={handleTimeupdate} src={images.video} ref={videoRef} loop></video>
            </div>

            <span
                className={cx('play-button', {
                    active: !isPlay,
                })}
            >
                <i className="fa-solid fa-play"></i>
            </span>

            <div className={cx('sound-button-wrapper')}>
                <span className={cx('sound-button')} onClick={handleMuted}>
                    {muted ? <i className="fa-solid fa-volume-xmark"></i> : <i className="fa-solid fa-volume-high"></i>}
                </span>
                <div onClick={(event) => event.stopPropagation()} className={cx('volume-bar')}>
                    <input value={volume} onChange={handleVolume} min={0} max={1} step={0.1} type="range" />
                </div>
                <div ref={fillVolumeRef} className={cx('fill-volume-bar')}></div>
            </div>

            <div onClick={(event) => event.stopPropagation()} className={cx('timeline-wrapper', classNameTimeLine)}>
                <input
                    type="range"
                    className={cx('timeline')}
                    value={time}
                    onChange={handleForwardVideo}
                    min="0"
                    max={duration.current}
                    step="1"
                />
                <span className={cx('running-time')}>
                    {formatTime(time)}/{formatTime(duration.current)}
                </span>
                <div className={cx('fill-bar-timeline')} ref={fillBarTimeLineRef}></div>
            </div>
        </>
    );
};

export default VideoElement;
