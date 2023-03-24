import React from 'react';
import classNames from 'classnames/bind';
import style from './ListContent.module.scss';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import VideoContent from './VideoContent/VideoContent';
import images from '../../../assets/images';
import { ImageCustom } from '../../DetailComponent';

const cx = classNames.bind(style);
const ItemContent = ({ dataVideo }) => {
    return (
        <li>
            <div className={cx('avatar')}>
                <ImageCustom src={images.imgGaiXinh} alt="avatar" />
            </div>
            <div className={cx('content-container')}>
                <HeaderContainer />
                <VideoContent dataVideo={dataVideo} />
            </div>
        </li>
    );
};

export default ItemContent;
