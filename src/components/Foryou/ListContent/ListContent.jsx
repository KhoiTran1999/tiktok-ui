import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import ItemContent from './ItemContent';
import style from './ListContent.module.scss';
import videos from '../../../assets/videos';

const cx = classNames.bind(style);
const ListContent = () => {
    return (
        <div className={cx('list-content')}>
            <ul>
                {Object.keys(videos).map((key, idx) => {
                    return <ItemContent key={idx} dataVideo={videos[key]} />;
                })}
            </ul>
        </div>
    );
};

export default ListContent;
