import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import images from '../../../assets/images';
import { Button } from '../../DetailComponent';
import GenerateThumbnail from '../generateThumbnail/GenerateThumbnail';
import style from './Preview.module.scss';

const cx = classNames.bind(style);
const Preview = ({ videoLink, setVideoLink, setThumbnailList }) => {
    const videoRef = useRef();
    const fillVolumeRef = useRef(() => '25px');
    const duration = useRef(0);
    const fillBarTimeLineRef = useRef();

    const [play, setPlay] = useState(true);
    const [muted, setMuted] = useState(true);
    const [volume, setVolume] = useState();
    const [time, setTime] = useState(0);

    const handleVideoUpload = (e) => {
        setVideoLink(URL.createObjectURL(e.target.files[0]));
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(videoLink);
        };
    }, [videoLink]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.oncanplay = () => {
                duration.current = videoRef.current.duration || 0;
            };
            setMuted(true);
        } else {
            setPlay(true);
            setVolume(0.5);
        }
    }, [videoLink]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.5;
        }
    }, [videoRef.current]);

    useEffect(() => {
        if (fillBarTimeLineRef.current) {
            fillBarTimeLineRef.current.style.width = `${(138 * time) / duration.current}px`;
        }
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
        const WIDTH_FILL_BAR = 50 * volume; //50px
        fillVolumeRef.current.style.height = `${WIDTH_FILL_BAR}px`;

        //muted icon when muted
        if (+e.target.value === 0) {
            setMuted(true);
            videoRef.current.muted = true;
            return;
        } else {
            setMuted(false);
            videoRef.current.muted = false;
        }
    };

    const handleForwardVideo = (e) => {
        setTime(e.target.value);
        videoRef.current.currentTime = e.target.value;
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

    //--------Generate thumbnail----------

    return (
        <label htmlFor="videoFile">
            {videoLink ? (
                <div className={cx('iphonePreview')}>
                    <video
                        ref={videoRef}
                        src={videoLink}
                        onTimeUpdate={handleTimeupdate}
                        className={cx('videoPreview')}
                        loop
                        muted
                        autoPlay
                    ></video>
                    <img className={cx('imgPreview')} src={images.previewVideo} alt="preview video image" />
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
                </div>
            ) : (
                <div className={cx('preview')}>
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <h4>Select video to upload</h4>
                    <h5>Or drag and drop a file</h5>
                    <p>MP4 or WebM</p>
                    <p>720x1280 resolution or higher</p>
                    <p>Up to 30 minutes</p>
                    <p>Less than 2 GB</p>
                    <Button primary medium>
                        <label style={{ cursor: 'pointer' }} htmlFor="videoFile">
                            Select file
                        </label>
                    </Button>
                    <input onChange={handleVideoUpload} type="file" id="videoFile" hidden accept="video/*" />
                </div>
            )}
            {videoLink ? (
                createPortal(
                    <GenerateThumbnail
                        videoLink={videoLink}
                        duration={duration.current}
                        setThumbnailList={setThumbnailList}
                    />,
                    document.body,
                )
            ) : (
                <></>
            )}
        </label>
    );
};

export default Preview;
