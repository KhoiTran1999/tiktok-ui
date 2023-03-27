import classNames from 'classnames/bind';
import React from 'react';
import Header from '../../components/Header/Header';
import style from './UploadLayout.module.scss';
import Messages from '../../components/Messages/Messages';
import UploadVideo from '../../components/UploadVideo/UploadVideo';

const cx = classNames.bind(style);
const UploadLayout = () => {
    return (
        <div>
            <div className={cx('container')}>
                <Header className={cx('UploadLayout-container-header')} />
                <div className={cx('row')}>
                    <UploadVideo />
                </div>
            </div>
        </div>
    );
};

export default UploadLayout;
