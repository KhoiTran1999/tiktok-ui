import React, { useEffect, useRef } from 'react';
import useScrollSnap from 'react-use-scroll-snap';
import classNames from 'classnames/bind';
import ItemContent from './ItemContent';
import style from './ListContent.module.scss';
import videos from '../../../assets/videos';

const cx = classNames.bind(style);
const ListContent = () => {
    const scrollRef = useRef(null);
    useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });

    return (
        <div className={cx('list-content')}>
            <ul ref={scrollRef}>
                {Object.keys(videos).map((key, idx) => {
                    return <ItemContent key={idx} dataVideo={videos[key]} />;
                })}
            </ul>
        </div>
    );
};

export default ListContent;
