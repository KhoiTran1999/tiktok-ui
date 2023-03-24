import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './VideoGrid.module.scss';
import videos from '../../../../assets/videos';
import VideoItem from './VideoItem';

const cx = classNames.bind(style);
const VideoGrid = () => {
    const [play, setPlay] = useState(true);
    const [pause, setPause] = useState(true);

    return (
        <div className={cx('videoGrid')}>
            <ul className={'row'}>
                {Object.keys(videos).map((key, idx) => {
                    return (
                        <VideoItem
                            play={play}
                            setPlay={setPlay}
                            pause={pause}
                            setPause={setPause}
                            key={idx}
                            dataVideo={videos[key]}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default VideoGrid;
