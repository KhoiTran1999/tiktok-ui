import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import ItemContent from './ItemContent';
import style from './ListContent.module.scss';
import { useSelector } from 'react-redux';
import { VideoListSelector } from '../../../redux/selector';

const cx = classNames.bind(style);
const ListContent = () => {
    const videoList = useSelector(VideoListSelector);

    return (
        <div className={cx('list-content')}>
            <ul>
                {videoList.map((val) => {
                    return <ItemContent key={val.id} video={val} />;
                })}
            </ul>
        </div>
    );
};

export default ListContent;
