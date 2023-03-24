import classNames from 'classnames/bind';
import React from 'react';
import style from './VideoGrid.module.scss';
import PlayLogo from '../../../../assets/icon/PlayLogo';

const cx = classNames.bind(style);
const VideoItem = ({ play, setPlay, pause, setPause, dataVideo }) => {
    return (
        <li className="col col-lg-5">
            <video loop muted>
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
