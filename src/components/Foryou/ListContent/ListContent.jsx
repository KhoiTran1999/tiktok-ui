import classNames from 'classnames/bind';
import React from 'react';
import images from '../../../assets/images';
import { ImageCustom } from '../../DetailComponent';
import style from './ListContent.module.scss';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import VideoContent from './VideoContent/VideoContent';

const cx = classNames.bind(style);
const ListContent = () => {
    return (
        <div className={cx('list-content')}>
            <ul>
                <li>
                    <div className={cx('avatar')}>
                        <ImageCustom src={images.imgGaiXinh} alt="avatar" />
                    </div>
                    <div className={cx('content-container')}>
                        <HeaderContainer />
                        <VideoContent />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ListContent;
