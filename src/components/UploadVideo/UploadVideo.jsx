import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './UploadVideo.module.scss';
import { SubnavWrapper } from '../DetailComponent';
import Preview from './Preview/Preview';
import AddDetail from './AddDetail/AddDetail';
import Footer from './Footer/Footer';

const cx = classNames.bind(style);
const UploadVideo = () => {
    const [videoLink, setVideoLink] = useState();
    const [thumbnailList, setThumbnailList] = useState([]);

    useEffect(() => {
        if (!videoLink) setThumbnailList([]);
    }, [videoLink]);

    return (
        <div className={cx('uploadVideo')}>
            <div className={cx('container')}>
                <div className={cx('upload-wrapper')}>
                    <SubnavWrapper scrollAction="visible" maxHeight="fit-content">
                        <div className={cx('upload-content')}>
                            <div className={cx('upload-header')}>
                                <h3>Upload video</h3>
                                <h4>Post a video to your account</h4>
                            </div>
                            <div className={cx('upload-body')}>
                                <Preview
                                    videoLink={videoLink}
                                    setVideoLink={setVideoLink}
                                    setThumbnailList={setThumbnailList}
                                />
                                <AddDetail
                                    videoLink={videoLink}
                                    setVideoLink={setVideoLink}
                                    thumbnailList={thumbnailList}
                                />
                            </div>
                        </div>
                    </SubnavWrapper>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('container')}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default UploadVideo;
