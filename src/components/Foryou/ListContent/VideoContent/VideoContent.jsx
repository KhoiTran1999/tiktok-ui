import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useElementOnScreen } from '../../../../hooks';
import UserInteractive from './UserInteractive/UserInteractive';
import style from './VideoContent.module.scss';

const cx = classNames.bind(style);
const VideoContent = ({ dataVideo }) => {
    const [play, setPlay] = useState(false);
    const [muted, setMuted] = useState(true);
    const [volume, setVolume] = useState(0.2);
    const [time, setTime] = useState(0);

    const fillVolumeRef = useRef('40px');
    const fillBarTimeLineRef = useRef('0px');
    const videoRef = useRef(null);
    const duration = useRef(0);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
    };
    const isVisible = useElementOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisible) {
            if (!play) {
                videoRef.current.play();
                setPlay(true);
            }
        } else {
            if (play) {
                videoRef.current.pause();
                setPlay(false);
            }
        }
    }, [isVisible]);

    useEffect(() => {
        videoRef.current.volume = volume;
        fillVolumeRef.current.style.height = '13px';
    }, []);

    useEffect(() => {
        videoRef.current.oncanplay = () => {
            duration.current = videoRef.current.duration || 0;
        };
    });

    useEffect(() => {
        fillBarTimeLineRef.current.style.width = `${(185 * time) / duration.current}px`;
    }, [time]);

    const handlePlay = () => {
        if (play) {
            setPlay(false);
            videoRef.current.pause();
        } else {
            setPlay(true);
            videoRef.current.play();
        }
    };

    const handleMutedVolume = () => {
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

    const handleTimeupdate = () => {
        setTime(Math.floor(videoRef.current.currentTime));
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

    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('wrapper')}>
                <video loop muted ref={videoRef} onTimeUpdate={handleTimeupdate}>
                    <source src={dataVideo} type={'video/mp4'} />
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
                        onClick={handleMutedVolume}
                        className={cx('volume-button', {
                            'fa-solid fa-volume-high': !muted,
                            'fa-solid fa-volume-xmark': muted,
                        })}
                    ></i>
                </div>
                <div className={cx('timeline-wrapper')}>
                    <input
                        type="range"
                        className={cx('timeline')}
                        value={time}
                        onChange={(e) => handleForwardVideo(e)}
                        min="0"
                        max={duration.current}
                        step="1"
                    />
                    <span className={cx('running-time')}>
                        {formatTime(time)}/{formatTime(duration.current)}
                    </span>
                    <div className={cx('fill-bar-timeline')} ref={fillBarTimeLineRef}></div>
                </div>
            </div>
            <UserInteractive />
        </div>
    );
};

export default VideoContent;
