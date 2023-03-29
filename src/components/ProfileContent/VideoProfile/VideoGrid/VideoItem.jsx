import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import style from './VideoGrid.module.scss';
import PlayLogo from '../../../../assets/icon/PlayLogo';

const cx = classNames.bind(style);
const VideoItem = ({ idVideoPlay, setIdVideoPlay, idVideo, linkVideo, poster, views, caption }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (idVideoPlay === idVideo) {
            videoRef.current.play();
        } else videoRef.current.pause();
    }, [idVideoPlay]);

    const handleHover = () => {
        setIdVideoPlay(idVideo);
    };
    return (
        <li
            className="col col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 col-xs-10 col-xxs-11"
            onMouseEnter={handleHover}
        >
            <video loop muted ref={videoRef} poster={poster}>
                <source src={linkVideo} type={'video/mp4'} />
                Your browser does not support the video tag.
            </video>
            <div className={cx('title')} title={`${caption}`}>
                {caption}
            </div>
            <PlayLogo className={cx('playLogo')} />
            <strong className={cx('views')}>{views}</strong>
        </li>
    );
};

export default VideoItem;
