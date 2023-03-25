import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import style from './VideoGrid.module.scss';
import PlayLogo from '../../../../assets/icon/PlayLogo';

const cx = classNames.bind(style);
const VideoItem = ({ idVideoPlay, setIdVideoPlay, idVideo, dataVideo }) => {
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
        <li className="col col-lg-5" onMouseEnter={handleHover}>
            <video loop muted ref={videoRef}>
                <source src={dataVideo} type={'video/mp4'} />
                Your browser does not support the video tag.
            </video>
            <div className={cx('title')} title="Cách đối phó với mẹ khi bị điểm kém#Cris #CrisPhan #CrisDevilGamer">
                Cách đối phó với mẹ khi bị điểm kém#Cris #CrisPhan #CrisDevilGamer
            </div>
            <PlayLogo className={cx('playLogo')} />
            <strong className={cx('views')}>4.1M</strong>
        </li>
    );
};

export default VideoItem;
